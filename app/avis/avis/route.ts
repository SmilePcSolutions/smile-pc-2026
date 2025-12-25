import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Sécurité fichiers (Photos uniquement)
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4 Mo max

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const nom = formData.get('nom') as string;
    const email = formData.get('email') as string;
    const note = formData.get('note') as string;
    const message = formData.get('message') as string;
    const files = formData.getAll('files') as File[];

    if (!nom || !note || !message) {
      return NextResponse.json({ error: "Merci de remplir la note et le message." }, { status: 400 });
    }

    for (const file of files) {
      if (file.size > 0) {
        if (!ALLOWED_TYPES.includes(file.type)) {
          return NextResponse.json({ error: "Seules les images (JPG, PNG) sont acceptées." }, { status: 400 });
        }
        if (file.size > MAX_FILE_SIZE) {
          return NextResponse.json({ error: "La photo est trop lourde (Max 4 Mo)." }, { status: 400 });
        }
      }
    }

    const attachments = await Promise.all(
      files.filter(f => f.size > 0).map(async (file) => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
      }))
    );

    const stars = "⭐".repeat(parseInt(note));

    // Design du mail que TU vas recevoir
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <body style="font-family: sans-serif; padding: 20px;">
        <div style="border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
          <h2 style="color: #2563eb;">Nouvel Avis Client Reçu ! 🎉</h2>
          <p><strong>Client :</strong> ${nom} (${email || "Pas d'email"})</p>
          
          <div style="background: #fdfce7; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <p style="font-size: 24px; margin: 0;">${stars} (${note}/5)</p>
          </div>

          <p><strong>Message :</strong></p>
          <blockquote style="background: #f9f9f9; padding: 15px; border-left: 4px solid #2563eb;">
            ${message.replace(/\n/g, '<br>')}
          </blockquote>
        </div>
      </body>
      </html>
    `;

    const data = await resend.emails.send({
      from: 'Smile PC Avis <contact@smilepcsolutions.fr>',
      to: ['misterjojo057@gmail.com'],
      subject: `⭐ Nouvel avis de ${nom} : ${note}/5`,
      attachments: attachments,
      html: emailHtml,
    });

    if (data.error) return NextResponse.json({ error: data.error }, { status: 500 });
    return NextResponse.json({ success: true });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}