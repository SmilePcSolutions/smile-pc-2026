import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Utilisation sécurisée de la clé
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const nom = formData.get('nom') as string;
    const prenom = formData.get('prenom') as string;
    const email = formData.get('email') as string;
    const telephone = formData.get('telephone') as string;
    const sujet = formData.get('sujet') as string; // ✅ Récupération du sujet
    const message = formData.get('message') as string;
    const files = formData.getAll('files') as File[];

    const attachments = await Promise.all(
      files.map(async (file) => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
      }))
    );

    const nomComplet = `${prenom} ${nom}`;
    
    // ✅ Le sujet du mail inclut maintenant la catégorie choisie
    const mailSubject = sujet ? `[${sujet}] Demande de ${nomComplet}` : `Nouveau contact de ${nomComplet}`;

    const data = await resend.emails.send({
      from: 'Smile PC Solutions <contact@smilepcsolutions.fr>',
      to: ['misterjojo057@gmail.com'],
      reply_to: email,
      subject: mailSubject,
      attachments: attachments,
      html: `
        <h2>Nouveau message du site</h2>
        <p><strong>Sujet :</strong> ${sujet}</p>
        <hr />
        <p><strong>De :</strong> ${nomComplet}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${telephone}</p>
        <p><strong>Message :</strong></p>
        <blockquote style="background: #f9f9f9; padding: 10px; border-left: 5px solid #ccc;">
          ${message}
        </blockquote>
      `,
    });

    if (data.error) return NextResponse.json({ error: data.error }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}