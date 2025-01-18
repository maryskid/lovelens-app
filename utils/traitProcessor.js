import supabase from "@/configs/supabaseClient";
import { calculateTraitValues } from "./calculateHelpers";
import { generateTraitDescription } from "./aiHelper";

export async function calculateTraitsForUser(sessionId, userId) {
  // Fetch all trait types
  const { data: traitTypes, error: traitTypesError } = await supabase
    .from("trait_types")
    .select("id, name, spectrum_start, spectrum_end, category_id");

  if (traitTypesError) throw new Error("Failed to fetch trait types.");

  for (const trait of traitTypes) {
    // Fetch responses for the trait's category
    const { data: responses, error: responsesError } = await supabase
      .from("quiz_responses")
      .select(`
        response_value,
        questions_reference!inner (
          question_text,
          metadata,
          category:category_id (
            title,
            description
          )
        )
      `)
      .eq("session_id", sessionId)
      .eq("user_id", userId)
      .eq("questions_reference.category_id", trait.category_id);

    if (responsesError) throw new Error("Failed to fetch responses.");

    if (!responses || responses.length === 0) {
      console.warn(`No responses found for trait: ${trait.name}`);
      continue; // Skip this trait if no responses
    }

    // Extract category details from the first response
    const categoryTitle = responses[0]?.questions_reference?.category?.title || "Unknown Category";
    const categoryDescription = responses[0]?.questions_reference?.category?.description || "No description available.";

    // Calculate trait values
    const { startValue, endValue } = calculateTraitValues(
      responses.map((r) => r.response_value)
    );

    // Generate the description using AI
    const description = await generateTraitDescription({
      traitName: trait.name,
      startTrait: trait.spectrum_start,
      endTrait: trait.spectrum_end,
      startValue,
      endValue,
      categoryTitle,
      categoryDescription,
      responses: responses.map((r) => ({
        question_text: r.questions_reference.question_text,
        response_value: r.response_value,
        spectrum_start: r.questions_reference.metadata.spectrum_start,
        spectrum_end: r.questions_reference.metadata.spectrum_end,
      })),
      calculationMethod: "Average response values normalized to a -3 to 3 scale.",
    });

    // Store the calculated trait in the database
    const { error: insertError } = await supabase
      .from("individual_traits")
      .insert({
        session_id: sessionId,
        user_id: userId,
        trait_type_id: trait.id,
        start_value: startValue,
        end_value: endValue,
        description,
        ai_model: "gpt-4o-mini"
      });

    if (insertError) throw new Error(`Failed to store individual traits for ${trait.name}:`, insertError);
  }
}
