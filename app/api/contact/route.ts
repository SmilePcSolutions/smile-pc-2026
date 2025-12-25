import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// 🛡️ SÉCURITÉ 1 : Liste des fichiers autorisés (Images et PDF uniquement)
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
// 🛡️ SÉCURITÉ 2 : Taille maximale par fichier (4 Mo)
const MAX_FILE_SIZE = 4 * 1024 * 1024; 

function formatPhoneNumber(phone: string) {
  if (!phone) return "Non renseigné";
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return cleaned.match(/.{1,2}/g)?.join(' ') || phone;
  }
  return phone;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const nom = formData.get('nom') as string;
    const prenom = formData.get('prenom') as string;
    const email = formData.get('email') as string;
    const telephone = formData.get('telephone') as string;
    const sujet = formData.get('sujet') as string;
    const message = formData.get('message') as string;
    const files = formData.getAll('files') as File[];

    // 🛡️ VÉRIFICATIONS DE SÉCURITÉ AVANT ENVOI

    // 1. Vérifier que les champs obligatoires ne sont pas vides
    if (!nom || !prenom || !email || !message) {
      return NextResponse.json({ error: "Tous les champs obligatoires doivent être remplis." }, { status: 400 });
    }

    // 2. Analyser chaque fichier pour détecter les menaces
    for (const file of files) {
      // Si le client n'a pas mis de fichier (taille 0), on passe
      if (file.size === 0) continue;

      // Vérification du TYPE (Virus, Exécutables, etc.)
      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json({ 
          error: `Le fichier "${file.name}" n'est pas autorisé. Seuls les images (JPG, PNG) et PDF sont acceptés.` 
        }, { status: 400 });
      }

      // Vérification de la TAILLE (Bombardement de données)
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json({ 
          error: `Le fichier "${file.name}" est trop lourd (Max 4 Mo).` 
        }, { status: 400 });
      }
    }

    const attachments = await Promise.all(
      files
        .filter(f => f.size > 0) // On garde seulement les vrais fichiers
        .map(async (file) => ({
          filename: file.name,
          content: Buffer.from(await file.arrayBuffer()),
        }))
    );

    const nomComplet = `${prenom} ${nom}`;
    const mailSubject = sujet ? `[${sujet}] Demande de ${nomComplet}` : `Nouveau contact de ${nomComplet}`;
    
    const displayPhone = formatPhoneNumber(telephone);
    const linkPhone = telephone.replace(/\D/g, '');

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Nouvelle demande de contact</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 20px;">
        
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb;">
          
          <div style="background-color: #2563eb; padding: 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 600;">Smile PC Solutions</h1>
          </div>

          <div style="padding: 25px;">
            <div style="margin-bottom: 20px;">
              <p style="margin: 0; font-size: 11px; color: #6b7280; text-transform: uppercase; font-weight: 700;">Sujet</p>
              <h2 style="margin: 5px 0 0 0; font-size: 18px; color: #111827;">${sujet || "Demande générale"}</h2>
            </div>

            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">

            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding-bottom: 12px; color: #6b7280; font-size: 14px; width: 30%;">Client</td>
                <td style="padding-bottom: 12px; color: #111827; font-weight: 500; font-size: 15px;">${nomComplet}</td>
              </tr>
              <tr>
                <td style="padding-bottom: 12px; color: #6b7280; font-size: 14px;">Email</td>
                <td style="padding-bottom: 12px;">
                  <a href="mailto:${email}" style="color: #2563eb; text-decoration: none; font-size: 15px;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding-bottom: 12px; color: #6b7280; font-size: 14px;">Téléphone</td>
                <td style="padding-bottom: 12px;">
                  <a href="tel:${linkPhone}" style="color: #2563eb; text-decoration: none; font-weight: 600; font-size: 16px;">
                    ${displayPhone}
                  </a>
                </td>
              </tr>
            </table>

            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">

            <p style="margin: 0 0 10px 0; font-size: 11px; color: #6b7280; text-transform: uppercase; font-weight: 700;">Message</p>
            <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 15px; color: #374151; line-height: 1.5; font-size: 15px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="background-color: #f9fafb; padding: 12px; text-align: center; font-size: 11px; color: #9ca3af; border-top: 1px solid #e5e7eb;">
            Smile PC Solutions • Formulaire Web
          </div>

        </div>
      </body>
      </html>
    `;

    const data = await resend.emails.send({
      from: 'Smile PC Solutions <contact@smilepcsolutions.fr>',
      to: ['misterjojo057@gmail.com'],
      reply_to: email,
      subject: mailSubject,
      attachments: attachments,
      html: emailHtml,
    });

    if (data.error) return NextResponse.json({ error: data.error }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}