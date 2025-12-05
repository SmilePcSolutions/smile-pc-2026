'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (payload: any) => {
  // Sécurité anti-robot (Pot de miel)
  if (payload._honey) return { success: true };

  const email = payload.email;
  const message = payload.message;
  const nom = payload.nom || "Non renseigné";
  const phone = payload.phone || "Non renseigné";
  const sujet = payload.sujet || "Contact Site";

  // Validation
  if (!email || !message) {
    return { error: "L'email et le message sont obligatoires." };
  }

  try {
    const data = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'misterjojo057@gmail.com',
      subject: `[Smile PC] ${sujet} - De ${nom}`,
      replyTo: email as string,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h2 style="color: #2563EB;">Nouveau Message Smile PC</h2>
          <div style="background: #f4f4f4; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p><strong>De :</strong> ${nom}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Tél :</strong> ${phone}</p>
            <p><strong>Sujet :</strong> ${sujet}</p>
          </div>
          <div style="border-left: 4px solid #2563EB; padding-left: 15px;">
            <h3>Message :</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <hr style="margin-top: 30px; border: 0; border-top: 1px solid #eee;" />
          <p style="font-size: 12px; color: #666;">
            <strong>Fichiers joints indiqués :</strong><br/>
            ${payload.fileName || 'Aucun fichier'}
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