import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Generate AI insights for the session
export default async function generateAIInsights(context) {  
  // Add error handling for alignments
  if (!context.alignments || context.alignments.length === 0) {
    console.error('No alignments found in context');
    return { 
      error: 'No alignments available',
      categoryInsights: [],
      overallInsights: null,
      overallPrompt: ''
    };
  }

  const categoryPrompts = context.alignments.map((alignment) => {
    // Ensure category has all necessary details
    const category = {
      categoryId: alignment.categoryId,
      title: alignment.category.title || 'Unknown Category',
      description: alignment.category.description || 'No description available',
      questions: alignment.category.questions || []
    };

    return {
      categoryId: category.categoryId,
      categoryTitle: category.title,
      prompt: createCategoryPrompt(
        category,
        alignment,
        context.profiles[0],
        context.profiles[1]
      )
    };
  });

  try {
    const categoryInsights = await Promise.all(
      categoryPrompts.map(async (categoryPrompt) => {
        const categoryCompletion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are a highly empathetic and insightful relationship psychologist. Your role is to help couples understand their dynamics, identify strengths, and offer thoughtful guidance to grow closer together.`
            },
            {
              role: "user",
              content: categoryPrompt.prompt
            }
          ],
          temperature: 0.7,
          response_format: { type: "json_object" }
        });

        const response = JSON.parse(categoryCompletion.choices[0].message.content);
        return {
          categoryId: categoryPrompt.categoryId,
          categoryTitle: categoryPrompt.categoryTitle,
          ...response
        };
      })
    );

    // Create overall prompt
    const overallPrompt = createOverallPrompt(context, categoryInsights);

    const overallCompletion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a relationship expert, tasked with providing comprehensive insights into a couple's dynamics. Your feedback should be warm, conversational, and deeply actionable.`
        },
        {
          role: "user",
          content: overallPrompt
        }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const overallInsights = JSON.parse(overallCompletion.choices[0].message.content);

    return {
      categoryInsights,
      overallInsights,
      overallPrompt
    };
  } catch (error) {
    console.error('Error generating overall insights:', error);
    return {
      error: error.message,
      categoryInsights: [],
      overallInsights: null,
      overallPrompt: ''
    };
  }
}

// Create a prompt for category-specific insights
function createCategoryPrompt(category, alignment, profile1, profile2) {
  return `
Imagine you're speaking directly to ${profile1.first_name} and ${profile2.first_name}, a couple seeking your guidance on their relationship. Their responses and alignment in the category "${category.title}" provide the following context:

CATEGORY CONTEXT:
- Description: ${category.description}

RESPONSE SPECTRUMS:
${(category.questions || []).map((q) => `
- "${q.questionText}" (Type: ${q.type})
  Spectrum: ${q.spectrumStart} ↔ ${q.spectrumEnd}
  - ${profile1.first_name}: ${q.partner1Response} (${interpretResponse(q.partner1Response)})
  - ${profile2.first_name}: ${q.partner2Response} (${interpretResponse(q.partner2Response)})
`).join("\n")}

ALIGNMENT METRICS:
- Overall Score: ${alignment.alignmentScore}%
- Alignment: ${alignment.types.alignment}%
- Complementarity: ${alignment.types.complementarity}%
- Balance: ${alignment.types.balance}%

GUIDANCE TASK:
1. Speak warmly and conversationally, addressing ${profile1.first_name} and ${profile2.first_name} directly.
2. Provide an encouraging insight (50 words) about where they align in this category.
3. Suggest one growth opportunity (50 words) to help them enhance their connection in this category.
4. Recommend two actionable steps they can take immediately.

Output your response in JSON format:
{
  "alignmentStrengths": "Personalized insight about alignment strengths in this category.",
  "growthOpportunities": "Personalized suggestion for growth in this category.",
  "actionableRecommendations": ["Step 1", "Step 2"]
}
`;
}

// Create a prompt for overall insights
function createOverallPrompt(context, categoryInsights) {
  // Organize all responses by category for comprehensive analysis
  const categorizedResponses = context.responses.reduce((acc, response) => {
    const categoryId = response.questions_reference.category_id;
    if (!acc[categoryId]) {
      acc[categoryId] = {
        category: response.questions_reference.category,
        questions: []
      };
    }
    acc[categoryId].questions.push({
      questionText: response.questions_reference.question_text,
      type: response.questions_reference.type,
      metadata: response.questions_reference.metadata,
      responses: {
        [context.profiles[0].id]: {
          value: context.responses.find(r => 
            r.user_id === context.profiles[0].id && 
            r.question_id === response.question_id
          )?.response_value,
          interpretation: interpretResponse(
            context.responses.find(r => 
              r.user_id === context.profiles[0].id && 
              r.question_id === response.question_id
            )?.response_value
          )
        },
        [context.profiles[1].id]: {
          value: context.responses.find(r => 
            r.user_id === context.profiles[1].id && 
            r.question_id === response.question_id
          )?.response_value,
          interpretation: interpretResponse(
            context.responses.find(r => 
              r.user_id === context.profiles[1].id && 
              r.question_id === response.question_id
            )?.response_value
          )
        }
      }
    });
    return acc;
  }, {});

  return `
COMPREHENSIVE RELATIONSHIP ANALYSIS:
Participants: ${context.profiles[0].first_name} (${context.profiles[0].gender}) and ${context.profiles[1].first_name} (${context.profiles[1].gender})

PREVIOUS CATEGORY INSIGHTS:
${categoryInsights.map(insight => `
Category ${insight.categoryId}: ${insight.categoryTitle}
- Alignment Strengths: ${insight.alignmentStrengths}
- Growth Opportunities: ${insight.growthOpportunities}
`).join('\n')}

DETAILED CATEGORY BREAKDOWN:
${Object.entries(categorizedResponses).map(([categoryId, categoryData]) => `
CATEGORY: ${categoryData.category.title}
Description: ${categoryData.category.description}

Detailed Questions Analysis:
${categoryData.questions.map(q => `
- Question: "${q.questionText}"
  Type: ${q.type}
  Spectrum: ${q.metadata?.spectrum_start || 'Start'} ↔ ${q.metadata?.spectrum_end || 'End'}
  
  Responses:
  - ${context.profiles[0].first_name}: ${q.responses[context.profiles[0].id].value} (${q.responses[context.profiles[0].id].interpretation})
  - ${context.profiles[1].first_name}: ${q.responses[context.profiles[1].id].value} (${q.responses[context.profiles[1].id].interpretation})
`).join('\n')}
`).join('\n\n')}

OVERALL ALIGNMENT METRICS:
${context.alignments.map((a) => `
Category: ${a.category.title}
- Overall Score: ${a.alignmentScore}%
- Alignment: ${a.types.alignment}%
- Complementarity: ${a.types.complementarity}%
- Balance: ${a.types.balance}%
`).join("\n")}

GUIDANCE TASK:
1. Speak directly to ${context.profiles[0].first_name} and ${context.profiles[1].first_name}.
2. Highlight their unique dynamics as a couple (50 words).
3. Provide an overall growth opportunity for ${context.profiles[0].first_name} (50 words).
4. Provide an overall growth opportunity for ${context.profiles[1].first_name} (50 words).
5. Suggest a shared growth opportunity for them as a couple (50 words).

Output your response in JSON format:
{
  "uniqueDynamics": "Insight about their unique dynamics as a couple.",
  "individualGrowth": {
    "${context.profiles[0].id}": "Growth opportunity for ${context.profiles[0].first_name}.",
    "${context.profiles[1].id}": "Growth opportunity for ${context.profiles[1].first_name}."
  },
  "sharedGrowth": "Shared growth opportunity for ${context.profiles[0].first_name} and ${context.profiles[1].first_name}."
}
`;
}

// Helper function to interpret responses
function interpretResponse(value) {
  if (!value && value !== 0) return "No response";
  if (value > 0) return "Tends towards the right spectrum";
  if (value < 0) return "Tends towards the left spectrum";
  return "Neutral/middle ground";
}