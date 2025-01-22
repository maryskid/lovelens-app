import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Enhanced system prompts
const SYSTEM_PROMPTS = {
  category: `You are a deeply perceptive relationship psychologist with expertise in:
- Attachment theory and relationship patterns
- Evidence-based couple interventions
- Practical relationship dynamics
- Communication styles and conflict resolution


Provide specific, actionable insights based on data patterns. Balance warmth with honesty, and ensure all feedback is grounded in the couple's actual responses.`,

  overall: `You are a thoughtful and honest relationship expert specializing in:
- Pattern recognition across relationship dimensions
- Integration of psychological frameworks
- Practical relationship enhancement strategies
- Building on existing relationship strengths

Provide realistic yet encouraging guidance based on concrete data patterns.`
};

// Validate context
function validateContext(context) {
  if (!context.alignments || context.alignments.length === 0) {
    throw new Error('No alignments found in context');
  }
  if (!context.profiles || context.profiles.length !== 2) {
    throw new Error('Invalid profiles in context');
  }
}

// Generate AI insights
export default async function generateAIInsights(context) {
  try {
    validateContext(context);

    const categoryPrompts = context.alignments.map((alignment) => {
      const category = {
        categoryId: alignment.categoryId,
        title: alignment.category.title || 'Unknown Category',
        description: alignment.category.description || 'No description available',
        questions: alignment.category.questions || []
      };

      return {
        categoryId: category.categoryId,
        categoryTitle: category.title,
        prompt: createEnhancedCategoryPrompt(
          category,
          alignment,
          context.profiles[0],
          context.profiles[1]
        )
      };
    });

    const categoryInsights = await Promise.all(
      categoryPrompts.map(async (categoryPrompt) => {
        const categoryCompletion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: SYSTEM_PROMPTS.category
            },
            {
              role: "user",
              content: categoryPrompt.prompt
            }
          ],
          temperature: 0,
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

    const overallPrompt = createEnhancedOverallPrompt(context, categoryInsights);

    const overallCompletion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPTS.overall
        },
        {
          role: "user",
          content: overallPrompt
        }
      ],
      temperature: 0,
      response_format: { type: "json_object" }
    });

    const overallInsights = JSON.parse(overallCompletion.choices[0].message.content);

    return {
      categoryInsights,
      overallInsights,
      overallPrompt
    };

  } catch (error) {
    console.error('Error generating insights:', error);
    return {
      error: error.message,
      categoryInsights: [],
      overallInsights: null,
      overallPrompt: ''
    };
  }
}

function createEnhancedCategoryPrompt(category, alignment, profile1, profile2) {
  const responseAnalysis = (category.questions || []).map(q => {
    const diff = Math.abs(q.partner1Response - q.partner2Response);
    const agreementLevel = diff <= 2 ? 'high' : diff <= 4 ? 'moderate' : 'low';
    
    return {
      question: q.questionText,
      alignment: agreementLevel,
      patterns: interpretResponses(q.partner1Response, q.partner2Response, q)
    };
  });

  return `
Analyze the relationship dynamic between ${profile1.first_name} and ${profile2.first_name} in "${category.title}".

CATEGORY CONTEXT:
${category.description}

RESPONSE ANALYSIS:
${category.questions.map((q) => `
Question: "${q.questionText}" (Type: ${q.type})
Spectrum: ${q.spectrumStart} ↔ ${q.spectrumEnd}
- ${profile1.first_name}: ${q.partner1Response} (${interpretResponse(q.partner1Response)})
- ${profile2.first_name}: ${q.partner2Response} (${interpretResponse(q.partner2Response)})
Pattern: ${responseAnalysis.find(r => r.question === q.questionText)?.patterns?.summary || 'No pattern detected'}
`).join('\n')}

ALIGNMENT METRICS:
- Overall Score: ${alignment.alignmentScore}%
- Alignment: ${alignment.types.alignment}%
- Complementarity: ${alignment.types.complementarity}%
- Balance: ${alignment.types.balance}%

TASKS:
- Identify core relationship patterns from the data.
- Connect patterns to specific relationship outcomes.
- Provide actionable, evidence-based recommendations.
- Consider both immediate and long-term improvements.
- Balance warmth with honest feedback.
- Highlight key strengths in this category (max 70 words), using concrete observations from their data.
- Provide growth opportunities tailored to their shared dynamics.
- Suggest specific, realistic steps they can implement immediately to improve.
- Honestly describe their traits without sugarcoating.
- Explain how their tendencies can impact their relationship positively or negatively.
- Offer realistic and actionable advice for growth or adaptation.
- Feel warm and compassionate but avoid over-positivity.
- Leverage the user’s specific scores and response patterns.

IMPORTANT!!!!!!: Output your response in JSON format also, speak directly to them like a human not like a robot:
{
  "alignmentStrengths": "Key alignment strength in this category based on specific patterns.",
  "growthOpportunities": "Specific growth opportunity supported by response data.",
  "actionableRecommendations": [
    "Concrete action step based on patterns",
    "Evidence-based recommendation",
    "Practical improvement strategy"
  ]
}`;
}

function createEnhancedOverallPrompt(context, categoryInsights) {
  const profile1 = context.profiles[0];
  const profile2 = context.profiles[1];

  return `
Provide a comprehensive relationship assessment for ${profile1.first_name} (${profile1.gender}) and ${profile2.first_name} (${profile2.gender}).
Base your insights on patterns across all categories and specific response data.

CATEGORY INSIGHTS:
${categoryInsights.map(insight => `
Category: ${insight.categoryTitle}
Strengths: ${insight.alignmentStrengths}
Growth Areas: ${insight.growthOpportunities}
`).join('\n')}

ALIGNMENT PATTERNS:
${context.alignments.map((a) => `
${a.category.title}:
- Score: ${a.alignmentScore}%
- Alignment: ${a.types.alignment}%
- Complementarity: ${a.types.complementarity}%
- Balance: ${a.types.balance}%
`).join('\n')}

REQUIREMENTS:
- Focus on actionable patterns and specific behaviors.
- Connect insights to relationship outcomes.
- Provide evidence-based recommendations.
- Balance encouragement with realistic guidance.
- Consider both individual and couple-level growth.
- Speak directly to them with a respectful tone.
- Highlight key strengths in this category (max 70 words), using concrete observations from their data.
- Provide growth opportunities (max 70 words) tailored to their shared dynamics.
- Suggest specific, realistic steps they can implement immediately to improve.
- Honestly describe their traits without sugarcoating.
- Explain how their tendencies can impact their relationship positively or negatively.
- Offer realistic and actionable advice for growth or adaptation.
- Feel warm and compassionate but avoid over-positivity.
- Leverage the user’s specific scores and response patterns.

IMPORTANT!!!!!!: Output your response in JSON format also, speak directly to them like a human not like a robot:
{
  "uniqueDynamics": "Evidence-based summary of relationship patterns.",
  "individualGrowth": {
    "${profile1.id}": "Specific growth opportunity for ${profile1.first_name}.",
    "${profile2.id}": "Specific growth opportunity for ${profile2.first_name}."
  },
  "sharedGrowth": "Concrete shared growth opportunity based on patterns."
}`;
}

// Enhanced helper functions
function interpretResponses(response1, response2, question) {
  const diff = Math.abs(response1 - response2);
  const sum = response1 + response2;
  
  return {
    summary: diff <= 2 ? "Aligned perspective" :
             diff <= 4 ? "Moderate difference" :
             "Significant difference",
    intensity: Math.abs(sum) <= 2 ? "Balanced" : "Strong",
    direction: sum > 0 ? "Positive-leaning" : "Negative-leaning"
  };
}

function interpretResponse(value) {
  if (value === null || value === undefined) return "No response provided";
  
  const intensity = Math.abs(value);
  const direction = value > 0 ? "positive" : "negative";
  
  if (intensity <= 2) return `Slight ${direction} tendency`;
  if (intensity <= 4) return `Moderate ${direction} tendency`;
  return `Strong ${direction} tendency`;
}
