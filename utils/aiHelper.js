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
  // Prepare dynamic response patterns summary
  const responsesSummary = responses
    .map((response, index) => {
      return `
      ${index + 1}. "${response.question_text}" (${response.response_value})
      Range: "${response.spectrum_start}" ↔ "${response.spectrum_end}"`;
    })
    .join("\n");

  // Generate dynamic, creative prompt
  const prompt = `
    You are a warm, insightful psychologist specializing in helping couples grow closer through honest self-awareness. 
    You provide balanced insights, grounded in the user's actual patterns, that highlight strengths, potential challenges, and actionable steps for growth.

    ABOUT THE RELATIONSHIP ASSESSMENT
    Trait: ${traitName}
    Category: ${categoryTitle}
    Understanding: ${categoryDescription}

    THEIR STYLE PROFILE
    Based on the analysis:
    - ${startValue > endValue ? `Primarily ${startTrait} (${startValue}%) with ${endTrait} (${endValue}%) tendencies` : `Primarily ${endTrait} (${endValue}%) with ${startTrait} (${startValue}%) tendencies`}
    - Key patterns from their responses:
    ${responsesSummary}

    GUIDANCE
    Share a thoughtful, nuanced insight (~50 words) that:
    - Honestly describes their trait without sugarcoating.
    - Explains how their tendencies can impact their relationship positively or negatively.
    - Offers realistic and actionable advice for growth or adaptation.
    - Feels warm and compassionate but avoids over-positivity.
    - Leverages the user’s specific scores and response patterns.

    Your response should:
    - Be free-flowing and dynamic, adapting to the specifics of the user input.
    - Balance warmth with honest observations, avoiding overly similar responses.
    - Provide fresh perspectives for each user, reflecting the variability of human relationships.

    Important to remember:
    - Avoid headings, meta-commentary, or formatting instructions.
    - Speak like a human psychologist
    - Be diverse in terms of tone of voice

    Example don't copy take inspiration:
    "Having a deeply reserved nature like yours means that you often process emotions internally rather than expressing them outwardly. While this reflective approach can bring calm 
    and thoughtfulness to your relationship, it might leave your partner guessing about how you feel, especially during conflict. Taking small steps to share your thoughts even briefly, 
    can prevent misunderstandings and build trust. Your introspective strength is a gift, but pairing it with open communication when it matters most could significantly deepen your connection."
  `

  try {
    // Call the OpenAI API to generate creative, personalized advice
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3
    });

    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error generating AI description:", error);
    throw new Error("Failed to generate AI description.");
  }
}
