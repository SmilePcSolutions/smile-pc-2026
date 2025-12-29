"use server";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import crypto from "crypto";

export async function loginAdmin(formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const input = ((formData.get("password") as string) || "").trim();
  const secret = (process.env.ADMIN_PASSWORD || "").trim();
  let match = false;
  if (secret && input && input.length === secret.length) {
    match = crypto.timingSafeEqual(Buffer.from(input), Buffer.from(secret));
  }
  if (!match) return { success: false, error: "Incorrect" };
  
  const store = await cookies();
  store.set("admin_session", "true", { maxAge: 86400, httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/" });
  return { success: true };
}

export async function getAvis() {
  const { data } = await supabase.from("avis").select("*").order("created_at", { ascending: false });
  return data || [];
}

export async function toggleAvis(id: number, current: boolean) {
  await supabase.from("avis").update({ approved: !current }).eq("id", id);
  revalidatePath("/bunker-smile-758"); revalidatePath("/avis");
}

export async function deleteAvis(id: number) {
  await supabase.from("avis").delete().eq("id", id);
  revalidatePath("/bunker-smile-758");
}

export async function logout() {
  const store = await cookies();
  store.delete("admin_session"); // CORRECTION ICI (1 seul argument)
  revalidatePath("/bunker-smile-758");
}