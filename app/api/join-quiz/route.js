import { NextResponse } from "next/server";
import supabase from "@/configs/supabaseClient";
import { calculateTraitsForUser } from "@/utils/traitProcessor";
import calculateAlignments from "@/utils/alignmentCalculator";
import generateAIInsights from "@/utils/aiProcessor";

export async function POST(req) {
  try {
    const body = await req.json();
    const { first_name, email, gender, code, answers } = body;

    // Input validation
    if (!first_name || !email || !code || !answers) {
      return NextResponse.json({ 
        error: "Missing required fields" 
      }, { status: 400 });
    }

    // Fetch the session using the provided code
    const { data: session, error: sessionError } = await supabase
      .from("quiz_sessions")
      .select("*")
      .eq("unique_code", code)
      .maybeSingle();

    if (sessionError || !session) {
      console.error("Invalid session code:", code);
      return NextResponse.json({ error: "Invalid session code." }, { status: 400 });
    }

    // Check if the partner slot is already filled
    if (session.partner_id) {
      console.error("Session already has a partner:", session.partner_id);
      return NextResponse.json({ error: "This session already has a partner." }, { status: 400 });
    }

    // Create the partner's profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .insert({ first_name, email, gender })
      .select()
      .single();

    if (profileError) {
      console.error("Error creating partner profile:", profileError);
      return NextResponse.json({ error: "Failed to create partner profile." }, { status: 500 });
    }

    // Update the session with the partner's profile ID
    const now = new Date().toISOString();
    const { data: updatedSession, error: updateError } = await supabase
      .from("quiz_sessions")
      .update({
        partner_id: profile.id,
        status: "completed",
        linked_at: now,
        completed_at: now,
      })
      .eq("id", session.id)
      .select()
      .single();

    if (updateError) {
      console.error("Error updating session:", updateError);
      return NextResponse.json({ error: "Failed to update session." }, { status: 500 });
    }

    // Store the partner's quiz responses
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

    // Trigger trait calculation for the partner
    await calculateTraitsForUser(session.id, profile.id);

    // Check if both participants have completed the quiz
    if (session.initiator_id && profile.id) {
      // Fetch responses with question references
      const { data: allResponses, error: responseError } = await supabase
        .from('quiz_responses')
        .select(`
          user_id,
          question_id,
          response_value,
          questions_reference (
            id,
            category_id,
            type,
            question_text,
            metadata
          )
        `)
        .eq('session_id', session.id)
        .in('user_id', [session.initiator_id, profile.id]);

      if (responseError) {
        console.error("Failed to fetch response data:", responseError);
        throw new Error("Failed to fetch response data");
      }

      // Fetch categories for the questions
      const categoryIds = [...new Set(
        allResponses
          .map(r => r.questions_reference.category_id)
          .filter(id => id !== null)
      )];

      const { data: categories, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .in('id', categoryIds);

      if (categoriesError) {
        console.error("Failed to fetch categories:", categoriesError);
        throw new Error("Failed to fetch categories");
      }

      // Enrich responses with category information
      const enrichedResponses = allResponses.map(response => ({
        ...response,
        questions_reference: {
          ...response.questions_reference,
          category: categories.find(
            c => c.id === response.questions_reference.category_id
          ) || { 
            id: response.questions_reference.category_id, 
            title: 'Unknown Category', 
            description: 'No description available' 
          }
        }
      }));

      // Fetch user profiles for context
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, first_name, gender')
        .in('id', [session.initiator_id, profile.id]);

      if (profilesError) {
        console.error("Failed to fetch profiles:", profilesError);
        throw new Error("Failed to fetch profiles");
      }

      // Calculate alignments
      const alignmentData = calculateAlignments(enrichedResponses, session.initiator_id, profile.id);

      // Prepare comprehensive data for AI
      const aiContext = {
        session,
        profiles,
        responses: enrichedResponses,
        alignments: alignmentData
      };

      // Generate AI insights
      const aiInsights = await generateAIInsights(aiContext);

      // Store results in couple_analysis
      const { error: analysisError } = await supabase
        .from('couple_analysis')
        .insert({
          session_id: session.id,
          alignments: alignmentData,
          ai_insights: aiInsights,
          ai_model: 'gpt-4o-mini'
        });

      if (analysisError) {
        console.error("Failed to store analysis:", analysisError);
        throw new Error("Failed to store analysis");
      }

      // Return complete results
      return NextResponse.json({
        success: true
      });
    }

  } catch (error) {
    console.error("Error handling join-quiz request:", error);
    return NextResponse.json({ 
      error: error.message,
      details: error.toString()
    }, { status: 500 });
  }
}