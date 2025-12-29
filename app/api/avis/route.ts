import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";
export const runtime = "nodejs";
const resend = new Resend(process.env.RESEND_API_KEY);

function sanitize(n: string) { return (n.split(/[/\\]/).pop()||"file").replace(/[^a-zA-Z0-9._-]+/g,"_").slice(0,80); }
function checkOrigin(req: Request) { 
  const o = req.headers.get("origin"); 
  if(!o) return true; 
  try { const h = new URL(o).hostname.toLowerCase(); return h.includes("smilepcsolutions") || h.includes("localhost") || h.includes("vercel.app"); } catch { return false; } 
}

export async function POST(req: Request) {
  try {
    if (!checkOrigin(req)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const form = await req.formData();
    if (form.get("b_check")) return NextResponse.json({ success: true }); // Honeypot

    const nom = (form.get("nom") as string || "").trim();
    const msg = (form.get("message") as string || "").trim();
    const email = (form.get("email") as string || "").trim();
    const note = Math.min(5, Math.max(1, Number(form.get("note")||5)));

    if (!nom || !msg) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const { error } = await supabase.from("avis").insert([{ nom, note, message: msg, email: email||null, approved: false }]);
    if (error) return NextResponse.json({ error: "DB Error" }, { status: 500 });

    const files = form.getAll("files") as File[];
    const attach = [];
    for (const f of files) {
      if (f.size > 0 && f.size < 4.5*1024*1024) {
        attach.push({ filename: sanitize(f.name), content: Buffer.from(await f.arrayBuffer()) });
      }
    }

    await resend.emails.send({
      from: "Smile PC Avis <contact@smilepcsolutions.fr>",
      to: ["misterjojo057@gmail.com"],
      reply_to: email || undefined,
      subject: "⭐ Nouvel avis : " + note + "/5",
      html: "<h2>Nouveau Client</h2><p><strong>"+nom+"</strong> ("+note+"/5)</p><blockquote>"+msg+"</blockquote>",
      attachments: attach
    });

    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: "Server Error" }, { status: 500 }); }
}