'use server'

import { z } from 'zod'
import { Resend } from 'resend'
import { prisma } from '../../lib/prisma'

const resend = new Resend(process.env.RESEND_API_KEY)

// Schéma de validation
const contactSchema = z.object({
  name: z.string().min(2, "Le nom est trop court."),
  email: z.string().email("Email invalide."),
  message: z.string().min(10, "Message trop court."),
  fileUrl: z.string().optional(),
})

export async function sendContactForm(prevState: any, formData: FormData) {
  // 1. Récupération
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
    fileUrl: formData.get('fileUrl'),
  }

  // 2. Validation
  const validatedFields = contactSchema.safeParse(rawData)

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Erreur de validation.",
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, email, message, fileUrl } = validatedFields.data

  try {
    // 3. Log en Base de Données
    await prisma.contactLog.create({
      data: { 
        email: email, 
        hasFile: !!fileUrl 
      },
    })

    // 4. Envoi Email via Resend
    // ⚠️ IMPORTANT : En mode test, 'to' DOIT être l'email de ton compte Resend
    await resend.emails.send({
      from: 'Smile Web <onboarding@resend.dev>',
      to: ['smilepcsolutions@gmail.com'], // <--- CORRECTION ICI (Ton email Resend)
      replyTo: email,
      subject: `Nouveau message de ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #2563eb; padding: 20px; text-align: center;">
            <h2 style="color: #ffffff; margin: 0;">Nouveau Contact</h2>
          </div>
          
          <div style="padding: 20px;">
            <p style="font-size: 16px;"><strong>👤 De :</strong> ${name}</p>
            <p style="font-size: 16px;"><strong>📧 Email :</strong> <a href="mailto:${email}" style="color: #2563eb;">${email}</a></p>
            
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            
            <p style="font-weight: bold;">Message :</p>
            <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; border-left: 4px solid #2563eb;">
              ${message.replace(/\n/g, '<br>')}
            </div>

            ${fileUrl ? `
              <div style="margin-top: 25px; text-align: center;">
                <a href="${fileUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                  📎 Voir la pièce jointe
                </a>
              </div>
            ` : ''}
          </div>
          
          <div style="background-color: #f3f4f6; padding: 10px; text-align: center; font-size: 12px; color: #6b7280;">
            Email envoyé via le site Smile PC Solutions
          </div>
        </div>
      `,
    })

    return { success: true, message: "Message envoyé avec succès !" }
  } catch (error) {
    console.error("Erreur serveur envoi mail:", error)
    return { success: false, message: "Erreur technique lors de l'envoi." }
  }
}