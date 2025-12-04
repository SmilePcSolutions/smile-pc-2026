'use server';

import { Resend } from 'resend';

// On vérifie si la clé est là (sans l'afficher en entier pour sécurité)
const keyStatus = process.env.RESEND_API_KEY ? "Clé PRÉSENTE" : "Clé ABSENTE (C'est ça le problème !)";
console.log("--- DIAGNOSTIC DÉMARRAGE ---");
console.log("Statut Clé API :", keyStatus);

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (payload: any) => {
  console.log("--- DÉBUT TENTATIVE ENVOI ---");
  
  if (payload._honey) {
    console.log("Stop : Robot détecté.");
    return { success: true };
  }

  const email = payload.email;
  const message = payload.message;
  const nom = payload.nom || "Non renseigné";
  
  // ON FORCE L'ADRESSE DE RÉCEPTION ICI POUR ÊTRE SÛR
  const destinataire = 'misterjojo057@gmail.com'; 

  console.log(`De: ${email}`);
  console.log(`Vers: ${destinataire}`);

  if (!email || !message) {
    console.log("Erreur : Champs manquants");
    return { error: 'Email et message requis.' };
  }

  try {
    const data = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: destinataire,
      subject: `[Smile PC] Nouveau message de ${nom}`,
      replyTo: email as string,
      html: `<p>Message de ${nom} (${email}) : ${message}</p>`,
    });

    if (data.error) {
      console.error("❌ ERREUR RESEND REFUSÉE :", data.error);
      return { error: "Resend a refusé l'envoi: " + data.error.message };
    }

    console.log("✅ SUCCÈS RESEND CONFIRMÉ :", data);
    return { success: true, data };

  } catch (error: any) {
    console.error("❌ CRASH TOTAL DU CODE :", error);
    return { error: "Erreur technique : " + error.message };
  }
};
