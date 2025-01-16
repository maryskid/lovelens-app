import { NextResponse } from "next/server";
import supabase from "@/configs/supabaseClient";

export async function POST(req) {
  try {
    const body = await req.json();
    const { code } = body;

    // Validate if the session with the provided code exists
    const { data: session, error: sessionError } = await supabase
      .from("quiz_sessions")
      .select("id")
      .eq("unique_code", code)
      .maybeSingle();

    if (sessionError || !session) {
      return NextResponse.json({ valid: false, message: "Session code not found." });
    }

    return NextResponse.json({ valid: true });
  } catch (error) {
    console.error("Error validating code:", error);
    return NextResponse.json({ valid: false, error: error.message }, { status: 500 });
  }
}
