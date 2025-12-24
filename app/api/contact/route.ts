import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// On initialise Resend avec ta clé (celle qui est dans les variables d'environnement)
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // 1. On récupère les infos envoyées par le formulaire
    const body = await request.json();
    const { nom, email, telephone, message } = body;

    console.log("📨 Tentative d'envoi de mail...");
    console.log("👤 Client :", nom, email);

    // 2. Vérification de sécurité simple
    if (!nom || !email || !message) {
      return NextResponse.json(
        { error: 'Champs manquants' },
        { status: 400 }
      );
    }

    // 3. L'ENVOI DU MAIL (La partie magique)
    const data = await resend.emails.send({
      // ⚠️ TRES IMPORTANT : L'expéditeur DOIT être ton domaine vérifié
      from: 'Smile PC Solutions <contact@smilepcsolutions.fr>',
      
      // Ton adresse perso où tu veux recevoir les demandes
      to: ['misterjojo057@gmail.com'], 
      
      // L'adresse du client (pour que "Répondre" aille chez lui)
      reply_to: email,
      
      subject: `🔔 Nouveau message de ${nom} (Smile PC)`,
      
      // Le corps du mail en HTML propre
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #0070f3;">Nouvelle demande de contact</h2>
          <p><strong>Nom :</strong> ${nom}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Téléphone :</strong> ${telephone || 'Non renseigné'}</p>
          <br/>
          <p><strong>Message :</strong></p>
          <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px;">
            ${message}
          </div>
        </div>
      `,
    });

    console.log("✅ Email envoyé avec succès !", data);
    return NextResponse.json(data);

  } catch (error) {
    console.error("❌ Erreur lors de l'envoi :", error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}