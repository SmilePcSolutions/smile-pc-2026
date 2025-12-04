'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (payload: any) => {
  // Sécurité robot
  if (payload._honey) return { success: true };

  const email = payload.email;
  const message = payload.message;
  const nom = payload.nom || "Non renseigné";
  const phone = payload.phone || "Non renseigné";
  const sujet = payload.sujet || "Contact Site";

  if (!email || !message) {
    return { error: 'Email et message requis.' };
  }

  try {
    const data = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'misterjojo057@gmail.com',
      subject: `[Smile PC] ${sujet} - De ${nom}`,
      replyTo: email as string,
      // C'est ici que ça plantait : je remets les backticks correctement et J'ENLÈVE la double virgule
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #2563EB;">Nouveau Message Smile PC</h2>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 8px;">
            <p><strong>De :</strong> ${nom}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Tél :</strong> ${phone}</p>
            <p><strong>Sujet :</strong> ${sujet}</p>
          </div>
          <br/>
          <h3>Message :</h3>
          <p style="font-size: 16px; white-space: pre-wrap;">${message}</p>
          <hr/>
          <p style="font-size: 12px; color: #666;">Fichiers joints indiqués : ${payload.fileName || 'Aucun'}</p>
        </div>
      `,
    });

    return { success: true, data };
  } catch (error: any) {
    console.error(error);
    return { error: "Erreur lors de l'envoi." };
  }
};
