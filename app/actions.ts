"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

// --- 1. LOGIN ADMIN ---
export async function loginAdmin(formData: FormData) {
  const password = formData.get("password");
  
  // Vérifie le mot de passe (défini dans .env.local)
  if (password === process.env.ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "true", { maxAge: 60 * 60 * 24 });
    return { success: true };
  } else {
    return { success: false, error: "Mot de passe incorrect" };
  }
}

// --- 2. RÉCUPÉRER LES AVIS ---
export async function getAvis() {
  const { data, error } = await supabase
    .from("avis")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) console.error("Erreur fetch:", error);
  return data || [];
}

// --- 3. VALIDER / MASQUER ---
export async function toggleAvis(id: number, currentStatus: boolean) {
  const { error } = await supabase
    .from("avis")
    .update({ approved: !currentStatus })
    .eq("id", id);

  if (error) throw new Error("Erreur mise à jour");
  
  revalidatePath("/admin");
  revalidatePath("/avis");
}

// --- 4. SUPPRIMER ---
export async function deleteAvis(id: number) {
  const { error } = await supabase
    .from("avis")
    .delete()
    .eq("id", id);

  if (error) throw new Error("Erreur suppression");

  revalidatePath("/admin");
}

// --- 5. DÉCONNEXION ---
export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  revalidatePath("/admin");
}