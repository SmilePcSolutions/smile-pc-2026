import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif", "application/pdf"];
const MAX_FILE_SIZE = 4 * 1024 * 1024;
const MAX_FILES = 3;

function escapeHtml(text: string) {
  if (!text) return "";
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function sanitizeFilename(name: string) {
  const base = name.split(/[/\\]/).pop() || "fichier";
  return base.replace(/[^a-zA-Z0-9._-]+/g, "_").slice(0, 80);
}

function originAllowed(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    const u = new URL(origin);
    const host = u.hostname.toLowerCase();
    return host === "smilepcsolutions.fr" || host === "www.smilepcsolutions.fr" || host.includes("localhost") || host.endsWith(".vercel.app");
  } catch { return false; }
}

export async function POST(request: Request) {
  try {
    if (!originAllowed(request)) return NextResponse.json({ error: "Origin refusée." }, { status: 403 });

    const formData = await request.formData();
    if (formData.get("honeypot_company")) return NextResponse.json({ success: true });

    const nom = formData.get("nom") as string;
    const prenom = formData.get("prenom") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;
    const telephone = formData.get("telephone") as string;
    const sujet = formData.get("sujet") as string;

    if (!nom || !email || !message) {
      return NextResponse.json({ error: "Champs obligatoires manquants." }, { status: 400 });
    }

    const files = formData.getAll("files") as File[]; // Correction vitale "files"
    const realFiles = files.filter((f) => f && f.size > 0);

    if (realFiles.length > MAX_FILES) return NextResponse.json({ error: "Trop de fichiers." }, { status: 400 });

    const attachments = [];
    for (const file of realFiles) {
      if (!ALLOWED_TYPES.includes(file.type)) return NextResponse.json({ error: `Format non supporté: ${file.name}` }, { status: 400 });
      if (file.size > MAX_FILE_SIZE) return NextResponse.json({ error: `Fichier trop lourd: ${file.name}` }, { status: 400 });
      
      const buf = Buffer.from(await file.arrayBuffer());
      attachments.push({ filename: sanitizeFilename(file.name), content: buf });
    }

    const safeNom = escapeHtml(nom);
    const safePrenom = escapeHtml(prenom);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");
    const safeTel = escapeHtml(telephone || "Non renseigné");
    const safeSujet = escapeHtml(sujet || "Nouveau contact");

    await resend.emails.send({
      from: "Smile PC Contact <contact@smilepcsolutions.fr>",
      to: ["misterjojo057@gmail.com"],
      reply_to: email,
      subject: `[${safeSujet}] Message de ${safePrenom} ${safeNom}`,
      html: `
        <h2>Nouvelle demande de contact</h2>
        <p><strong>De :</strong> ${safePrenom} ${safeNom}</p>
        <p><strong>Email :</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
        <p><strong>Téléphone :</strong> ${safeTel}</p>
        <hr />
        <p><strong>Message :</strong></p>
        <div style="background: #f4f4f5; padding: 15px; border-radius: 5px;">${safeMessage}</div>
      `,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}