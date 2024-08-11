"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { v4 as uuidV4 } from "uuid";

export async function createLetter(formData: FormData) {
  const supabase = createClient();
  const text = formData.get("text") as string;
  const user_id = formData.get("user_id") as string;
  const letter_id = uuidV4();

  // Set the user_id as a session variable
  await supabase.rpc("set_claim", { name: "app.user_id", value: user_id });

  const { error } = await supabase
    .from("letters")
    .insert({ text, user_id, letter_id });

  if (error) {
    console.error("Supabase error:", JSON.stringify(error, null, 2));
    throw new Error(`Failed to create letter: ${error.message}`);
  }

  revalidatePath("/dashboard/letters");
  return { success: true };
}
