import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// ⚠️ ATTENTION : On met la clé en dur juste pour débloquer la situation.
// On l'enlèvera plus tard quand ça marchera.
const resend = new Resend('re_jpNo41Ed_CU6gDiCkHydzLuRXBgc4Edap');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nom, email, message, telephone } = body;

    // On envoie directement sans se poser de questions
    const data = await resend.emails.send({
      from: 'Smile PC Solutions <contact@smilepcsolutions.fr>',
      to: ['misterjojo057@gmail.com'],
      reply_to: email,
      subject: `🔥 TEST FINAL : Message de ${nom}`,
      html: `
        <h2>Nouveau contact (Mode Force)</h2>
        <p><strong>De:</strong> ${nom} (${email})</p>
        <p><strong>Tel:</strong> ${telephone}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (data.error) {
      // Si Resend refuse, on renvoie l'erreur exacte
      return NextResponse.json({ error: data.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data.data?.id });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}