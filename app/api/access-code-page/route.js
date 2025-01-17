import { NextResponse } from "next/server";
import supabase from "@/configs/supabaseClient";

export async function POST(req) {
  try {
    const { uniqueCode, firstName } = await req.json();

    // Fetch the session and join the initiator's profile to retrieve first_name
    const { data: session, error } = await supabase
      .from("quiz_sessions")
      .select(`
        id,
        unique_code,
        profiles!initiator_id(first_name)
      `)
      .eq("unique_code", uniqueCode)
      .maybeSingle();

    if (error || !session) {
      return NextResponse.json({ valid: false });
    }

    // Check if the first name matches the initiator's first_name
    if (session.profiles?.first_name !== firstName) {
      return NextResponse.json({ valid: false });
    }

    return NextResponse.json({ valid: true });
  } catch (error) {
    console.error("Error validating unique code:", error);
    return NextResponse.json({ valid: false, error: error.message }, { status: 500 });
  }
}
