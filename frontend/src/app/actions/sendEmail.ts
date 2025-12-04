'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (payload: any) => {
  if (payload._honey) return { success: true }; // Anti-bot silencieux

  const email = payload.email;
  const message = payload.message;
  const nom = payload.nom || "Non renseigné";
  const phone = payload.phone || "Non renseigné";
  const sujet = payload.sujet || "Nouveau message";

  if (!email || !message) return { error: 'Email et message requis.' };

  try {
    const data = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'misterjojo057@gmail.com',
      subject: `[Smile PC] ${sujet} - De ${nom}`,
      replyTo: email as string,
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2 style="color: #2563EB;">Nouveau Contact</h2>
          <p><strong>De :</strong> ${nom} (${email})</p>
          <p><strong>Tel :</strong> ${phone}</p>
          <p><strong>Sujet :</strong> ${sujet}</p>
          <hr/>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <p style="font-size: 12px; color: #888;">Fichiers joints : ${payload.fileName || 'Aucun'}</p>
        </div>
      `,
    });
    return { success: true, data };
  } catch (error: any) {
    return { error: error.message };
  }
};
