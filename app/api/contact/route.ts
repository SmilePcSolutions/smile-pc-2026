import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Fonction de nettoyage du numéro
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

    const attachments = await Promise.all(
      files.map(async (file) => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
      }))
    );

    const nomComplet = `${prenom} ${nom}`;
    const mailSubject = sujet ? `[${sujet}] Demande de ${nomComplet}` : `Nouveau contact de ${nomComplet}`;
    
    // Variables pour les liens
    const displayPhone = formatPhoneNumber(telephone);
    const linkPhone = telephone.replace(/\D/g, '');

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Nouvelle demande de contact</title>
      </head>
      <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 20px;">
        
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          
          <div style="background-color: #2563eb; padding: 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">Smile PC Solutions</h1>
            <p style="color: #bfdbfe; margin: 5px 0 0 0; font-size: 14px;">Nouvelle demande d'intervention</p>
          </div>

          <div style="padding: 32px;">
            
            <div style="margin-bottom: 25px;">
              <span style="background-color: #eff6ff; color: #2563eb; padding: 6px 12px; border-radius: 99px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Sujet</span>
              <h2 style="margin: 10px 0 0 0; font-size: 20px; color: #1e293b;">${sujet || "Demande générale"}</h2>
            </div>

            <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 25px 0;">

            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding-bottom: 15px; color: #64748b; font-size: 14px; width: 30%;">Client</td>
                <td style="padding-bottom: 15px; color: #0f172a; font-weight: 600; font-size: 16px;">${nomComplet}</td>
              </tr>
              <tr>
                <td style="padding-bottom: 15px; color: #64748b; font-size: 14px;">Email</td>
                <td style="padding-bottom: 15px;">
                  <a href="mailto:${email}" style="color: #2563eb; text-decoration: none; font-weight: 500;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding-bottom: 15px; color: #64748b; font-size: 14px; vertical-align: middle;">Téléphone</td>
                <td style="padding-bottom: 15px; vertical-align: middle;">
                  <a href="tel:${linkPhone}" style="color: #2563eb; text-decoration: none; font-weight: 700; font-size: 18px; background-color: #eff6ff; padding: 8px 16px; border-radius: 99px; border: 1px solid #bfdbfe; display: inline-block;">
                    📞 ${displayPhone}
                  </a>
                </td>
              </tr>
            </table>

            <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 25px 0;">

            <p style="font-size: 12px; color: #94a3b8; font-weight: 700; text-transform: uppercase; margin-bottom: 10px;">Message</p>
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; color: #334155; line-height: 1.6; font-size: 15px;">
              ${message.replace(/\n/g, '<br>')}
            </div>

          </div>

          <div style="background-color: #f8fafc; padding: 15px; text-align: center; font-size: 12px; color: #cbd5e1;">
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