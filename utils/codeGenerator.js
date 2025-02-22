import supabase from "@/configs/supabaseClient";
import { customAlphabet } from "nanoid";

// Define a custom alphabet with only letters and numbers
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const nanoid = customAlphabet(alphabet, 4); // Generate 4-character strings

export async function generateUniqueCode() {
  let uniqueCode;
  let isUnique = false;
  let attempts = 0;

  while (!isUnique && attempts < 1000) { // Limit attempts to prevent infinite loops
    uniqueCode = `LOVE-${nanoid()}-${nanoid()}`;

    // Query the database to check for the unique_code
    const { data, error } = await supabase
      .from("quiz_sessions")
      .select("id")
      .eq("unique_code", uniqueCode)
      .maybeSingle(); // Use maybeSingle() to handle zero rows gracefully

    if (!data && !error) {
      // If no data is found and there's no error, the code is unique
      isUnique = true;
    } else if (error) {
      console.error("Error querying unique code:", error);
      throw new Error("Database query failed.");
    }

    attempts++;
  }

  if (!isUnique) {
    console.error("Failed to generate a unique code after 1000 attempts.");
    throw new Error("Unique code generation failed.");
  }

  return uniqueCode;
}
