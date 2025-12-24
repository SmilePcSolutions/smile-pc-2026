import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  console.log("🕵️‍♂️ --- DÉBUT DE L'ENQUÊTE ---");

  try {
    // 1. PIÈGE N°1 : Vérifier si la clé est bien là
    const apiKey = process.env.RESEND_API_KEY;
    
    if (!apiKey) {
      console.error("❌ ERREUR FATALE : La variable RESEND_API_KEY est introuvable !");
      return NextResponse.json({ error: 'Clé API manquante sur le serveur' }, { status: 500 });
    }
    
    // On affiche les 5 premiers caractères pour être sûr que c'est la nouvelle
    console.log("🔑 Clé détectée :", apiKey.substring(0, 5) + "...");

    // 2. PIÈGE N°2 : Vérifier ce que le formulaire envoie
    const body = await request.json();
    console.log("📦 Données reçues du formulaire :", body);

    const { nom, email, message } = body;

    // 3. PIÈGE N°3 : Tester la connexion Resend
    const resend = new Resend(apiKey);

    console.log("📨 Tentative d'envoi vers Resend...");

    const data = await resend.emails.send({
      from: 'Smile PC Solutions <contact@smilepcsolutions.fr>',
      to: ['misterjojo057@gmail.com'],
      reply_to: email, // On répond au client
      subject: `🕵️ RAPPORT D'ENQUÊTE : Message de ${nom}`,
      html: `
        <h1>Preuve de fonctionnement</h1>
        <p>Ce mail prouve que Vercel arrive à parler à Resend.</p>
        <hr />
        <p><strong>Nom du client :</strong> ${nom}</p>
        <p><strong>Email du client :</strong> ${email}</p>
        <p><strong>Message :</strong> ${message}</p>
      `,
    });

    // 4. VERDICT
    if (data.error) {
      console.error("❌ RESEND A REJETÉ L'ENVOI :", data.error);
      return NextResponse.json({ error: data.error }, { status: 500 });
    }

    console.log("✅ SUCCÈS : Resend a accepté le message !", data);
    return NextResponse.json({ success: true, id: data.data?.id });

  } catch (error: any) {
    // 5. LE FILET DE SÉCURITÉ
    console.error("💥 CRASH TOTAL DU SCRIPT :", error);
    return NextResponse.json({ 
      error: 'Crash serveur', 
      details: error.message 
    }, { status: 500 });
  }
}