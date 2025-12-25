import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // DESIGN EMAIL PROFESSIONNEL (HTML + CSS INLINE)
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Nouvelle demande de contact</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 20px;">
        
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <div style="background-color: #2563eb; padding: 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Smile PC Solutions</h1>
            <p style="color: #bfdbfe; margin: 5px 0 0 0; font-size: 14px;">Nouvelle demande reçue du site web</p>
          </div>

          <div style="padding: 30px;">
            
            <div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 15px; margin-bottom: 25px;">
              <p style="margin: 0; font-size: 12px; color: #64748b; font-weight: bold; text-transform: uppercase;">Sujet de la demande</p>
              <p style="margin: 5px 0 0 0; font-size: 18px; color: #1e293b; font-weight: bold;">${sujet || "Non spécifié"}</p>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; width: 30%;">Client</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-weight: bold;">${nomComplet}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #2563eb;">
                  <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Téléphone</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${telephone || "Non renseigné"}</td>
              </tr>
            </table>

            <p style="font-size: 12px; color: #64748b; font-weight: bold; text-transform: uppercase; margin-bottom: 10px;">Message du client :</p>
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; color: #334155; line-height: 1.6;">
              ${message.replace(/\n/g, '<br>')}
            </div>

            <div style="margin-top: 30px; text-align: center;">
              <a href="mailto:${email}?subject=Re: Votre demande Smile PC - ${sujet}" style="background-color: #2563eb; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">Répondre au client</a>
            </div>

          </div>

          <div style="background-color: #f1f5f9; padding: 15px; text-align: center; font-size: 12px; color: #94a3b8;">
            <p style="margin: 0;">Cet email a été envoyé via le formulaire de contact de Smile PC Solutions.</p>
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