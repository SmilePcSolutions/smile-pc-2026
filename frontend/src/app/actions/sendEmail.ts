'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (payload: any) => {
  // Anti-Robot
  if (payload._honey) return { success: true };

  const email = payload.email;
  const message = payload.message;
  const nom = payload.nom || "Non renseigné";
  const phone = payload.phone || "Non renseigné";
  const sujet = payload.sujet || "Contact Site";

  if (!email || !message) {
    return { error: "Email et message obligatoires" };
  }

  try {
    const data = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'misterjojo057@gmail.com',
      subject: `[Smile PC] ${sujet} - De ${nom}`,
      replyTo: email as string,
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2 style="color: #2563EB;">Nouveau Message</h2>
          <p><strong>De :</strong> ${nom} (<a href="mailto:${email}">${email}</a>)</p>
          <p><strong>Tél :</strong> ${phone}</p>
          <p><strong>Sujet :</strong> ${sujet}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 16px; line-height: 1.5;">${message.replace(/\n/g, '<br>')}</p>
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            Fichiers joints indiqués : ${payload.fileName || 'Aucun'}
          </p>
        </div>
      `,
    });
    return { success: true, data };
  } catch (error: any) {
    console.error("Erreur Resend:", error);
    return { error: "Erreur technique lors de l'envoi." };
  }
};
