import supabase from "@/configs/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Parse query parameters
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");

    if (!sessionId) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Fetch couple analysis (alignments and AI insights)
    const { data: coupleAnalysis, error: coupleAnalysisError } = await supabase
      .from("couple_analysis")
      .select("alignments, ai_insights")
      .eq("session_id", sessionId)
      .single();

    if (coupleAnalysisError || !coupleAnalysis) {
      throw new Error("Failed to fetch couple analysis.");
    }

    const aiInsights = coupleAnalysis?.ai_insights || {};
    const overallInsights = aiInsights?.overallInsights || {};
    const individualGrowth = overallInsights?.individualGrowth || {};

    // Fetch individual traits for both users
    const { data: traitsData, error: traitsError } = await supabase
      .from("individual_traits")
      .select(
        "user_id, trait_type_id, start_value, end_value, description, trait_types(name, spectrum_start, spectrum_end)"
      )
      .eq("session_id", sessionId);

    if (traitsError || !traitsData) {
      throw new Error("Failed to fetch individual traits.");
    }

    // Fetch user profiles
    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select("id, first_name, gender, email")
      .in("id", Object.keys(individualGrowth));

    if (profilesError || !profiles || profiles.length !== 2) {
      throw new Error("Failed to fetch user profiles.");
    }

    // Map individual traits by user
    const traitsByUser = traitsData.reduce((acc, trait) => {
      const userId = trait.user_id;
      if (!acc[userId]) acc[userId] = [];
      acc[userId].push({
        name: trait.trait_types.name,
        labels: {
          [trait.trait_types.spectrum_start]: {
            value: trait.start_value,
            isDominant: trait.start_value > trait.end_value,
          },
          [trait.trait_types.spectrum_end]: {
            value: trait.end_value,
            isDominant: trait.end_value > trait.start_value,
          },
        },
        description: trait.description,
      });
      return acc;
    }, {});

    // Map users
    const [user1, user2] = profiles;

    const firstUser = {
      name: user1?.first_name || "Unknown",
      gender: user1?.gender,
      avatar: user1?.gender === "female" ? "/female-emoji.png" : "/male-emoji.png",
      traits: traitsByUser[user1?.id] || [],
      growthOpportunity: individualGrowth[user1?.id] || "No growth opportunity available.",
    };

    const secondUser = {
      name: user2?.first_name || "Unknown",
      gender: user2?.gender,
      avatar: user2?.gender === "female" ? "/female-emoji.png" : "/male-emoji.png",
      traits: traitsByUser[user2?.id] || [],
      growthOpportunity: individualGrowth[user2?.id] || "No growth opportunity available.",
    };

    // Format alignments
    const alignments = coupleAnalysis.alignments.map((alignment) => {
      const categoryId = alignment.categoryId; // Correctly retrieve the category ID
      const categoryInsights = aiInsights.categoryInsights?.find(i => i.categoryId === categoryId) || {}; // Handle missing insights safely

      return {
        name: alignment.category.title || "Unknown Category", // Use default if title is missing
        subtitle: alignment.category.description || "No description available.",
        alignmentPercentage: alignment.alignmentScore || 0, // Ensure a default value for scores
        icon: `/category-${categoryId}.png`, // Dynamically map category icons
        alignmentText: categoryInsights.alignmentStrengths || "No strengths available.", // Default for missing insights
        growthOpportunity: categoryInsights.growthOpportunities || "No growth opportunities available.", // Default for missing insights
      };
    });

    // Format unique dynamics and shared growth opportunity
    const uniqueDynamicsText = {
      title: "Your Unique Dynamics",
      description: overallInsights.uniqueDynamics || "No unique dynamics available.",
    };

    const together = {
      growthOpportunity: overallInsights.sharedGrowth || "No shared growth opportunity available.",
    };

    // Return structured data
    return NextResponse.json({
      firstUser,
      secondUser,
      alignments,
      uniqueDynamicsText,
      together,
    });
  } catch (error) {
    console.error("Error fetching report data:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
