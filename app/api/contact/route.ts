import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// ⚠️ ATTENTION : Colle ta NOUVELLE clé (celle qui commence par re_fc6...)
// entre les guillemets ci-dessous
const resend = new Resend('re_fcW3JFPg_BreCDHuwKmQwzX1T6m5BQ3iK');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nom, email, message, telephone } = body;

    const data = await resend.emails.send({
      from: 'Smile PC Solutions <contact@smilepcsolutions.fr>',
      to: ['misterjojo057@gmail.com'],
      reply_to: email,
      subject: `🚨 CONTACT URGENT : ${nom}`,
      html: `
        <h2>Message du Site Web</h2>
        <p><strong>Nom:</strong> ${nom}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Tél:</strong> ${telephone}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data.data?.id });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}