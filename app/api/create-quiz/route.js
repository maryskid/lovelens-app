import { NextResponse } from "next/server";
import { generateUniqueCode } from "@/utils/codeGenerator";
import supabase from "@/configs/supabaseClient";
import { calculateTraitsForUser } from "@/utils/traitProcessor";


export async function POST(req) {
  try {
    const body = await req.json();
    const { first_name, email, gender, answers } = body; // Initiator's details

    // Step 1: Insert the initiator's profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .insert({ first_name, email, gender })
      .select()
      .single();

    if (profileError) {
      console.error("Profile error:", profileError);
      throw new Error("Failed to create profile.");
    }

    // Step 2: Create a new quiz session
    const sessionUniqueCode = await generateUniqueCode();
    const { data: session, error: sessionError } = await supabase
      .from("quiz_sessions")
      .insert({
        initiator_id: profile.id,
        unique_code: sessionUniqueCode,
      })
      .select()
      .single();

    if (sessionError) {
      console.error("Session creation error:", sessionError);
      throw new Error("Failed to create quiz session.");
    }

    // Step 3: Store the initiator's quiz responses
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

    // Trigger trait calculation to generate the user's traits and store them in the database
    await calculateTraitsForUser(session.id, profile.id);

    // Return the session unique code
    return NextResponse.json({ sessionUniqueCode });
  } catch (error) {
    console.error("Error creating quiz session:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
