import { NextResponse } from 'next/server';

// Force l'utilisation de Node.js (stabilité + Buffer + uploads)
export const runtime = "nodejs";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// SÉCURITÉ : Images ET Vidéos autorisées
// Ajout de video/mp4 (Android/Web) et video/quicktime (iPhone .mov) et webm
const ALLOWED_TYPES = [
  'image/jpeg', 'image/png', 'image/webp', 
  'video/mp4', 'video/quicktime', 'video/webm'
];

// Limite Vercel (environ 4.5 Mo max pour le corps de la requête)
const MAX_FILE_SIZE = 4.5 * 1024 * 1024; 

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // 🛡️ SÉCURITÉ 1 : HONEYPOT (Anti-Bot)
    // Si le champ caché est rempli, on simule un succès et on arrête (ne pas envoyer d'email).
    if (formData.get("honeypot_company")) {
      console.warn("🤖 Bot bloqué par Honeypot");
      return NextResponse.json({ success: true });
    }

    // 🛡️ SÉCURITÉ 2 : TYPAGE STRICT (Anti-Crash)
    // On vérifie les champs critiques avant toute logique métier existante.
    const __nom = formData.get("nom");
    const __email = formData.get("email");
    const __message = formData.get("message");

    if (
      typeof __nom !== "string" || !__nom.trim() ||
      typeof __email !== "string" || !__email.trim() ||
      typeof __message !== "string" || !__message.trim()
    ) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants ou invalides." },
        { status: 400 }
      );
    }
const nom = formData.get('nom') as string;
    const email = formData.get('email') as string;
    const note = formData.get('note') as string;
    const message = formData.get('message') as string;
    const files = formData.getAll('files') as File[];

    // 1. Vérification que les champs obligatoires sont remplis
    if (!nom || !note || !message) {
      return NextResponse.json({ error: "Merci de remplir la note et le message." }, { status: 400 });
    }

    // 2. Vérification de sécurité des fichiers
    for (const file of files) {
      if (file.size > 0) {
        // Vérification du TYPE
        if (!ALLOWED_TYPES.includes(file.type)) {
          return NextResponse.json({ error: "Format non supporté. Envoyez une image ou une vidéo (MP4/MOV)." }, { status: 400 });
        }
        // Vérification de la TAILLE
        if (file.size > MAX_FILE_SIZE) {
          return NextResponse.json({ error: `Le fichier est trop lourd (${(file.size / 1024 / 1024).toFixed(1)} Mo). Limite : 4.5 Mo.` }, { status: 400 });
        }
      }
    }

    // 3. Préparation des pièces jointes
    const attachments = await Promise.all(
      files.filter(f => f.size > 0).map(async (file) => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
      }))
    );

    // 4. Création des étoiles visuelles
    const stars = "⭐".repeat(parseInt(note));

    // 5. Design du mail que TU vas recevoir
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <body style="font-family: sans-serif; padding: 20px;">
        <div style="border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
          <h2 style="color: #2563eb;">Nouvel Avis Client Reçu ! 🎉</h2>
          <p><strong>Client :</strong> ${nom} (${email || "Pas d'email"})</p>
          
          <div style="background: #fdfce7; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <p style="font-size: 24px; margin: 0;">${stars} (${note}/5)</p>
          </div>

          <p><strong>Message :</strong></p>
          <blockquote style="background: #f9f9f9; padding: 15px; border-left: 4px solid #2563eb;">
            ${message.replace(/\n/g, '<br>')}
          </blockquote>
          
          <p style="font-size: 12px; color: #666; margin-top: 20px;">
            Pièce jointe (Photo ou Vidéo) incluse dans ce mail si le client en a ajouté une.
          </p>
        </div>
      </body>
      </html>
    `;

    // 6. Envoi via Resend
    const data = await resend.emails.send({
      from: 'Smile PC Avis <contact@smilepcsolutions.fr>',
      to: ['misterjojo057@gmail.com'],
      subject: `⭐ Nouvel avis de ${nom} : ${note}/5`,
      attachments: attachments,
      html: emailHtml,
    });

    if (data.error) return NextResponse.json({ error: data.error }, { status: 500 });
    return NextResponse.json({ success: true });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

