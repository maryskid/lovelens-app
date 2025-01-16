import { NextResponse } from "next/server";
import supabase from "@/configs/supabaseClient";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Body:", body);
    const { first_name, email, gender, code, answers } = body;

    // Step 1: Fetch the session using the provided code
    const { data: session, error: sessionError } = await supabase
      .from("quiz_sessions")
      .select("*")
      .eq("unique_code", code)
      .maybeSingle();

    if (sessionError || !session) {
      console.error("Invalid session code:", code);
      return NextResponse.json({ error: "Invalid session code." }, { status: 400 });
    }

    // Step 2: Check if the partner slot is already filled
    if (session.partner_id) {
      console.error("Session already has a partner:", session.partner_id);
      return NextResponse.json({ error: "This session already has a partner." }, { status: 400 });
    }

    // Step 3: Create the partner's profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .insert({ first_name, email, gender })
      .select()
      .single();

    if (profileError) {
      console.error("Error creating partner profile:", profileError);
      return NextResponse.json({ error: "Failed to create partner profile." }, { status: 500 });
    }

    // Step 4: Update the session with the partner's profile ID
    const now = new Date().toISOString();
    const { data: updatedSession, error: updateError } = await supabase
      .from("quiz_sessions")
      .update({
        partner_id: profile.id,
        status: "completed", // Mark session as completed
        linked_at: now, // Set linked timestamp
        completed_at: now, // Set completed timestamp
      })
      .eq("id", session.id)
      .select()
      .single();

    if (updateError) {
      console.error("Error updating session:", updateError);

      // Update the session to indicate failure
      await supabase
        .from("quiz_sessions")
        .update({ status: "failed" }) // Mark session as failed
        .eq("id", session.id);

      return NextResponse.json({ error: "Failed to join the session." }, { status: 500 });
    }

    // Step 5: Store the partner's quiz responses
    const responses = answers.map((answer) => ({
      session_id: session.id,
      user_id: profile.id,
      question_id: answer.questionId,
      response_value: answer.answer,
    }));

    const { error: responsesError } = await supabase
      .from("quiz_responses")
      .insert(responses);

    if (responsesError) {
      console.error("Quiz responses error:", responsesError);
      throw new Error("Failed to store quiz responses.");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error handling join-quiz request:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
