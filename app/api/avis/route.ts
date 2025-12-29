import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

const ALLOWED_TYPES = [
  "image/jpeg", "image/png", "image/webp", "image/heic", "image/heif",
  "video/mp4", "video/quicktime", "video/webm",
];

const MAX_FILE_SIZE = 4.5 * 1024 * 1024; // 4.5 Mo
const MAX_FILES = 1;

// --- Fonctions Utilitaires ---
function escapeHtml(text: string): string {
  if (!text) return "";
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function sanitizeFilename(name: string): string {
  const base = name.split(/[/\\]/).pop() || "fichier";
  return base.replace(/[^a-zA-Z0-9._-]+/g, "_").slice(0, 80);
}

function originAllowed(request: Request): boolean {
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
    // 1. SÉCURITÉ : Vérification Origine
    if (!originAllowed(request)) {
      return NextResponse.json({ error: "Origin refusée." }, { status: 403 });
    }

    const formData = await request.formData();

    // 2. HONEYPOT (Anti-Robot)
    if (formData.get("b_check")) {
      return NextResponse.json({ success: true });
    }

    // 3. RÉCUPÉRATION DONNÉES
    const nom = formData.get("nom") as string;
    const note = formData.get("note") as string;
    const message = formData.get("message") as string;
    const email = formData.get("email") as string;

    if (!nom || !note || !message) {
      return NextResponse.json({ error: "Champs obligatoires manquants." }, { status: 400 });
    }

    // 4. SAUVEGARDE DANS SUPABASE (BDD) 💾
    const { error: dbError } = await supabase
      .from('avis')
      .insert([
        {
          nom: nom,
          note: Number(note),
          message: message,
          email: email,
          approved: false, // Par défaut : en attente de validation
          verified: false
        }
      ]);

    // 🚨 DEBUG : Si la BDD échoue, ON ARRÊTE TOUT et on affiche l'erreur
    if (dbError) {
      console.error("❌ Erreur Supabase:", dbError);
      return NextResponse.json({ error: "Erreur BDD : " + dbError.message }, { status: 500 });
    }

    // 5. TRAITEMENT FICHIERS (Pour l'email)
    const files = formData.getAll("files") as File[];
    const realFiles = files.filter((f) => f && f.size > 0);

    if (realFiles.length > MAX_FILES) {
      return NextResponse.json({ error: "Trop de fichiers." }, { status: 400 });
    }

    const attachments = [];
    for (const file of realFiles) {
      if (!ALLOWED_TYPES.includes(file.type)) return NextResponse.json({ error: "Format non supporté." }, { status: 400 });
      if (file.size > MAX_FILE_SIZE) return NextResponse.json({ error: "Fichier trop lourd." }, { status: 400 });
      
      const buf = Buffer.from(await file.arrayBuffer());
      attachments.push({ filename: sanitizeFilename(file.name), content: buf });
    }

    // 6. ENVOI EMAIL
    const safeNom = escapeHtml(nom);
    const safeEmail = email ? escapeHtml(email) : "";
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");
    const noteNum = Number(note);

    await resend.emails.send({
      from: "Smile PC Avis <contact@smilepcsolutions.fr>",
      to: ["misterjojo057@gmail.com"],
      reply_to: email && email.includes("@") ? email : undefined,
      subject: `⭐ Nouvel avis de ${safeNom} : ${noteNum}/5`,
      html: `
        <h2>Nouvel Avis Client (Enregistré ✅)</h2>
        <p><strong>Client :</strong> ${safeNom} ${safeEmail ? `(${safeEmail})` : ""}</p>
        <p><strong>Note :</strong> ${noteNum}/5 ⭐</p>
        <blockquote style="background: #f9f9f9; padding: 15px; border-left: 4px solid #2563eb;">${safeMessage}</blockquote>
        <p style="color: #666; font-size: 12px; margin-top: 20px;">Cet avis est bien enregistré dans Supabase (table 'avis').</p>
      `,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Erreur API Avis:", error);
    return NextResponse.json({ error: "Erreur serveur : " + error.message }, { status: 500 });
  }
}