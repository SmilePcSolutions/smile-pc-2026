import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { prisma } from '@/lib/prisma';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, type, message, fileUrls } = body;

    // 1. Sauvegarde dans la base de données
    const savedContact = await prisma.contact.create({
      data: {
        name,
        email,
        phone,
        type,
        message,
        fileUrls: fileUrls || [],
      },
    });

    // 2. Envoi de l'email via Resend
    await resend.emails.send({
      from: 'Smile Web <onboarding@resend.dev>',
      to: ['smilepcsolutions@gmail.com'],
      reply_to: email,  // <--- C'EST CORRIGÉ ICI (reply_to)
      subject: `Nouveau contact : ${type} de ${name}`,
      html: `
        <h1>Nouveau Message du Site</h1>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${phone}</p>
        <p><strong>Type :</strong> ${type}</p>
        <hr />
        <p><strong>Message :</strong></p>
        <p>${message}</p>
        <hr />
        ${fileUrls && fileUrls.length > 0 ? `<p><strong>Fichiers joints :</strong> ${fileUrls.join(', ')}</p>` : ''}
      `,
    });

    return NextResponse.json({ success: true, data: savedContact });

  } catch (error) {
    console.error('Erreur API Contact:', error);
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}
