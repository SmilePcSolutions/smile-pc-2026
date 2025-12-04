'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (payload: any) => {
  
  const email = payload.email;
  const message = payload.message;
  const nom = payload.nom || "Non renseigné";
  const phone = payload.phone || "Non renseigné";
  const sujet = payload.sujet || "Nouveau message du site";

  if (!email || !message) {
    return { error: 'L\'email et le message sont obligatoires.' };
  }

  try {
    const data = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'misterjojo057@gmail.com',
      subject: `[Smile PC] ${sujet} - De ${nom}`,
      replyTo: email as string,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #0070f3;">Nouveau message de contact</h2>
          <p><strong>De :</strong> ${nom}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Téléphone :</strong> ${phone}</p>
          <p><strong>Sujet :</strong> ${sujet}</p>
          <hr style="margin: 20px 0; border: 0; border-top: 1px solid #ccc;" />
          <h3 style="margin-bottom: 10px;">Message :</h3>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 5px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
      `,
    });

    return { success: true, data };

  } catch (error: any) {
    console.error("Erreur d'envoi:", error);
    return {
      error: error.message || "Une erreur est survenue lors de l'envoi.",
    };
  }
};
