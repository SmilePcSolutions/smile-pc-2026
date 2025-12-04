'use server';
// Correction appliquee a 15:56:03

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (payload: any) => {
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
      subject: [Smile PC]  - De ,
      replyTo: email as string,
      html: 
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #2563EB;">Nouveau Message Smile PC</h2>
          <div style="background: #f4f4f4; padding: 20px; border-radius: 8px;">
            <p><strong>De :</strong> </p>
            <p><strong>Email :</strong> </p>
            <p><strong>Tél :</strong> </p>
            <p><strong>Sujet :</strong> </p>
          </div>
          <br/>
          <p style="white-space: pre-wrap;"></p>
          <hr/>
          <p style="font-size: 12px; color: #666;">Fichiers : </p>
        </div>
      ,
    });

    return { success: true, data };
  } catch (error: any) {
    console.error(error);
    // Message d'erreur plus clair pour le diagnostic
    return { error: "Erreur technique (" + error.message + ")" };
  }
};