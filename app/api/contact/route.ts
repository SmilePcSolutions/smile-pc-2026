import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    // IMPORTANT : On récupère 'fileUrls' (au pluriel, tableau de textes)
    const { email, name, phone, message, type, fileUrls } = body

    if (!email || !message || !name) {
      return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })
    }

    // 1. Sauvegarde dans la Base de Données (avec la liste des fichiers)
    await prisma.contactLog.create({
      data: {
        email,
        name,
        phone: phone || '',
        message,
        type: type || 'Autre',
        fileUrls: fileUrls || [], // On sauvegarde le tableau de liens
      },
    })

    // 2. Préparation des pièces jointes pour l'email
    // On transforme les URLs en objets que Resend comprend
    const attachments = (fileUrls || []).map((url: string, index: number) => ({
      filename: `Piece-jointe-${index + 1}.jpg`, // Nom générique pour le mail
      path: url
    }))

    // 3. Envoi de l'email
    await resend.emails.send({
      from: 'Smile PC <onboarding@resend.dev>',
      to: 'smilepcsolutions@gmail.com', // Ton adresse
      subject: `🔥 Nouveau Contact : ${type}`,
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2 style="color: #2563EB;">Nouveau message Smile PC</h2>
          <p><strong>De :</strong> ${name} (<a href="mailto:${email}">${email}</a>)</p>
          <p><strong>Tel :</strong> ${phone || 'Non renseigné'}</p>
          <p><strong>Sujet :</strong> ${type}</p>
          <hr />
          <p style="background: #f4f4f5; padding: 15px; border-radius: 8px;">${message.replace(/\n/g, '<br>')}</p>
          
          ${fileUrls && fileUrls.length > 0 ? `<p>📎 <strong>${fileUrls.length} Fichier(s) joint(s)</strong></p>` : ''}
        </div>
      `,
      attachments: attachments
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Erreur API:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}