'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// On utilise 'any' ici pour accepter l'objet envoyé par ta page contact
// (fileName, fileData, nom, phone, email, sujet, message)
export const sendEmail = async (payload: any) => {
  
  // 1. Récupération des données envoyées par ton formulaire
  const email = payload.email;
  const message = payload.message;
  const nom = payload.nom || "Non renseigné";
  const phone = payload.phone || "Non renseigné";
  const sujet = payload.sujet || "Nouveau message du site";

  // 2. Validation simple
  if (!email || !message) {
    return { error: 'L\'email et le message sont obligatoires.' };
  }

  try {
    // 3. Envoi via Resend
    const data = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'smilepcsolutions@gmail.com', // Ton adresse de réception
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

    // 4. RETOUR IMPORTANT : On renvoie "success: true" 
    // C'est ce que ta page contact attend pour afficher "Message envoyé !"
    return { success: true, data };

  } catch (error: any) {
    console.error("Erreur d'envoi:", error);
    return {
      error: error.message || "Une erreur est survenue lors de l'envoi.",
    };
  }
};