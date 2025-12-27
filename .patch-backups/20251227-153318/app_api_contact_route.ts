import { NextResponse } from 'next/server';

// Force l'utilisation de Node.js (stabilité + Buffer + uploads)
export const runtime = "nodejs";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
const MAX_FILE_SIZE = 4 * 1024 * 1024; 

// 🛡️ Fonction pour nettoyer le texte (empêche le piratage HTML)
function escapeHtml(text: string) {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatPhoneNumber(phone: string) {
  if (!phone) return "Non renseigné";
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return cleaned.match(/.{1,2}/g)?.join(' ') || phone;
  }
  return phone;
}

// Validation Email simple et robuste
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
// Nettoyage des champs texte
    const nom = escapeHtml(formData.get('nom') as string);
    const prenom = escapeHtml(formData.get('prenom') as string);
    const telephone = escapeHtml(formData.get('telephone') as string);
    const sujet = escapeHtml(formData.get('sujet') as string);
    
    // Gestion Spécifique EMAIL (Pas d'escape, mais Trim + Validation)
    const emailRaw = formData.get('email') as string;
    const email = emailRaw ? emailRaw.trim() : "";

    const messageRaw = formData.get('message') as string;
    const message = escapeHtml(messageRaw);
    
    const files = formData.getAll('files') as File[];

    // 1. Vérification des champs obligatoires
    if (!nom || !prenom || !email || !messageRaw) {
      return NextResponse.json({ error: "Tous les champs obligatoires doivent être remplis." }, { status: 400 });
    }

    // 2. Validation format Email
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "L'adresse email n'est pas valide." }, { status: 400 });
    }

    // 3. Vérification des fichiers
    for (const file of files) {
      if (file.size === 0) continue;
      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json({ error: `Le fichier "${file.name}" n'est pas autorisé.` }, { status: 400 });
      }
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: `Le fichier "${file.name}" est trop lourd (Max 4 Mo).` }, { status: 400 });
      }
    }

    const attachments = await Promise.all(
      files.filter(f => f.size > 0).map(async (file) => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
      }))
    );

    const nomComplet = `${prenom} ${nom}`;
    const displayPhone = formatPhoneNumber(telephone);
    const linkPhone = telephone.replace(/\D/g, '');

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <body style="font-family: sans-serif; background-color: #f4f4f5; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
          <h2 style="color: #2563eb;">Nouvelle demande de contact</h2>
          <p><strong>De :</strong> ${nomComplet}</p>
          <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Téléphone :</strong> <a href="tel:${linkPhone}">${displayPhone}</a></p>
          <p><strong>Sujet :</strong> ${sujet || "Aucun"}</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
          <p><strong>Message :</strong></p>
          <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; white-space: pre-wrap;">${message}</div>
        </div>
      </body>
      </html>
    `;

    const data = await resend.emails.send({
      from: 'Smile PC Contact <contact@smilepcsolutions.fr>',
      to: ['misterjojo057@gmail.com'],
      reply_to: email,
      subject: sujet ? `[${sujet}] Contact de ${nomComplet}` : `Nouveau contact de ${nomComplet}`,
      attachments: attachments,
      html: emailHtml,
    });

    if (data.error) return NextResponse.json({ error: data.error }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

