"use server";

import { createClient } from "@/lib/supabase/server";
import { v4 as uuidV4 } from "uuid";

export async function createLetter(formData: FormData) {
  const supabase = createClient();
  const title = formData.get("title") as string;
  const text = formData.get("text") as string;
  const user_id = formData.get("user_id") as string;
  const confetti = formData.get("confetti") === "true"; // Changed this line
  const confetti_type = formData.get("confetti_type") as string;
  const confetti_emoji = formData.get("confetti-emoji") as string;
  const letter_id = uuidV4();

  // Set the user_id as a session variable
  await supabase.rpc("set_claim", { name: "app.user_id", value: user_id });

  const { error } = await supabase.from("letters").insert({
    title,
    text,
    user_id,
    letter_id,
    confetti,
    confetti_type,
    confetti_emoji: confetti_type === "custom" ? confetti_emoji : null,
  });

  if (error) {
    console.error("Supabase error:", JSON.stringify(error, null, 2));
    throw new Error(`Failed to create letter: ${error.message}`);
  }

  // revalidatePath("/dashboard/letters");
  return { success: true };
}
