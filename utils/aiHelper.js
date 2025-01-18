import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});


export async function generateTraitDescription({
  traitName,
  startTrait,
  endTrait,
  startValue,
  endValue,
  categoryTitle,
  categoryDescription,
  responses,
  calculationMethod,
}) {
  // Format responses with spectrum details
  const responsesSummary = responses
    .map((response, index) => {
      const spectrumStart = response.spectrum_start || "N/A";
      const spectrumEnd = response.spectrum_end || "N/A";
      return `
      ${index + 1}. "${response.question_text}" (${response.response_value})
      (Spectrum: "${spectrumStart}" ↔ "${spectrumEnd}")`;
    })
    .join("\n");

  // Generate prompt
  const prompt = `
    You are a warm, insightful relationship psychologist who specializes in helping couples understand their unique dynamics.
    Your expertise in the Myers Briggs Type Indicator personality model helps partners appreciate their natural styles and grow together.
    
    ABOUT THE RELATIONSHIP ASSESSMENT
    Trait: ${traitName}
    Category: ${categoryTitle}
    Understanding: ${categoryDescription}
    
    Their Style Profile:
    ${startValue > endValue ? `
    Primarily ${startTrait} (${startValue}%)
    with ${endTrait} (${endValue}%) tendencies
    ` : `
    Primarily ${endTrait} (${endValue}%)
    with ${startTrait} (${startValue}%) tendencies
    `}
    How this was measured: ${calculationMethod}
    
    THEIR DETAILED RESPONSES
    ${responses.map(r => `
    "${r.question_text}" (${r.response_value})
    Range: ${r.spectrum_start} ↔ ${r.spectrum_end}`).join('\n')}
    
    GUIDANCE
    Share a warm, conversational perspective (about 50 words) that touches on:
    - How their ${traitName.toLowerCase()} style influences their relationship
    - What makes their approach special
    - A gentle suggestion for growth
    - The gift their style brings to love
    
    Keep it natural and flowing - imagine you're having a thoughtful conversation over coffee. Draw from their specific responses but weave them naturally into your insights.
    
    Remember:
    - Focus on relationship impact
    - Stay warm and encouraging
    - Let the narrative flow organically
    - Tap  into the Myers Briggs Type Indicator model learnings
    - No meta-commentary, formatting, or questions
    - No headings or sections
    - No asterisks or formatting
    - No questions at the end
  `

  try {
    // Generate the description using the OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
          {
              role: "user",
              content: prompt,
          },
      ],
    });
  
    return completion.choices[0].message.content.trim();

  } catch (error) {
    console.error("Error generating AI description:", error);
    throw new Error("Failed to generate AI description.");
  }
}


