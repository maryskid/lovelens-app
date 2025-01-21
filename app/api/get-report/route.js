import supabase from "@/configs/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Parse the request body
    const body = await req.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }

    // Fetch the session using the provided code
    const { data: session, error: sessionError } = await supabase
      .from("quiz_sessions")
      .select("id, status")
      .eq("unique_code", code)
      .single();

    if (sessionError || !session) {
      return NextResponse.json({ error: "Invalid code" }, { status: 404 });
    }

    // Check if the session status is "completed"
    if (session.status !== "completed") {
      return NextResponse.json({ error: "Oops! Looks like you or your partner still need to finish the quiz." }, { status: 403 });
    }

    // Redirect to the report page with session ID in the query
    return NextResponse.json({ sessionId: session.id }, { status: 200 });
  } catch (error) {
    console.error("Error validating code:", error.message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
