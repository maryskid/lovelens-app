import { NextResponse } from "next/server";
import supabase from "@/configs/supabaseClient";

export async function POST(req) {
  try {
    const body = await req.json();
    const { code } = body;
    

    // Check if the session with the provided code exists
    const { data: session, error: sessionError } = await supabase
      .from("quiz_sessions")
      .select("id, partner_id, status")
      .eq("unique_code", code)
      .maybeSingle();

    if (sessionError || !session) {
      // Session does not exist
      return NextResponse.json({ valid: false, code: "NOT_FOUND" });
    }

    // Check if the session is already completed or has a partner
    if (session.partner_id || session.status === "completed") {
      // Session is completed or already has a partner
      return NextResponse.json({ valid: true, code: "COMPLETED" });
    }

    // Session is valid and can be joined
    return NextResponse.json({ valid: true, code: "VALID" });
  } catch (error) {
    console.error("Error validating code:", error);
    return NextResponse.json({ valid: false, code: "ERROR", message: error.message }, { status: 500 });
  }
}
