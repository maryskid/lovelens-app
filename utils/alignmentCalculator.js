function calculateAlignments(allResponses, partner1Id, partner2Id) {
  // First, pair responses by question
  const pairedResponses = allResponses.reduce((acc, response) => {
    const questionId = response.question_id;
    if (!acc[questionId]) {
      acc[questionId] = {
        questions_reference: response.questions_reference,
        partner1Answer: null,
        partner2Answer: null
      };
    }
    if (response.user_id === partner1Id) {
      acc[questionId].partner1Answer = response.response_value;
    } else if (response.user_id === partner2Id) {
      acc[questionId].partner2Answer = response.response_value;
    }
    return acc;
  }, {});

  // Group complete pairs by category
  const responsesByCategory = Object.values(pairedResponses).reduce((acc, pair) => {
    if (pair.partner1Answer === null || pair.partner2Answer === null) {
      return acc; // Skip incomplete pairs
    }
    
    const categoryId = pair.questions_reference.category_id;
    if (!acc[categoryId]) {
      acc[categoryId] = {
        pairs: [],
        category: pair.questions_reference.category || {}
      };
    }
    acc[categoryId].pairs.push(pair);
    return acc;
  }, {});

  // Process each category
  const alignments = Object.entries(responsesByCategory).map(([categoryId, categoryData]) => {
    const categoryPairs = categoryData.pairs;
    
    // Initialize type scores for the category
    const typeScores = {
      ALIGNMENT: { score: 0, count: 0 },
      COMPLEMENTARITY: { score: 0, count: 0 },
      BALANCE: { score: 0, count: 0 },
    };

    // Collect category questions for detailed insights
    const categoryQuestions = categoryPairs.map(pair => ({
      questionText: pair.questions_reference.question_text,
      type: pair.questions_reference.type,
      spectrumStart: pair.questions_reference.metadata?.spectrum_start || 'Start',
      spectrumEnd: pair.questions_reference.metadata?.spectrum_end || 'End',
      partner1Response: pair.partner1Answer,
      partner2Response: pair.partner2Answer
    }));

    // Process each complete pair of responses
    categoryPairs.forEach((pair) => {
      const { type } = pair.questions_reference;
      const partner1Value = pair.partner1Answer;
      const partner2Value = pair.partner2Answer;

      if (type === "ALIGNMENT") {
        // For ALIGNMENT: perfect match = 100%, maximum difference (-3 vs +3) = 0%
        const diff = Math.abs(partner1Value - partner2Value);
        // Max difference is 6 (from -3 to +3), so divide by 6 to normalize
        const alignScore = Math.max(0, 100 - (diff / 6) * 100);
        typeScores.ALIGNMENT.score += alignScore;
        typeScores.ALIGNMENT.count += 1;
      } 
      else if (type === "COMPLEMENTARITY") {
        // For COMPLEMENTARITY: ideal difference is around 3-4 points
        const diff = Math.abs(partner1Value - partner2Value);
        const idealDiff = 3;  // Ideal difference on -3 to +3 scale
        // Max possible deviation from ideal is 3, so divide by 3
        const complScore = Math.max(0, 100 - Math.abs(diff - idealDiff) / 3 * 100);
        typeScores.COMPLEMENTARITY.score += complScore;
        typeScores.COMPLEMENTARITY.count += 1;
      } 
      else if (type === "BALANCE") {
        // For BALANCE: both answers should be close to 0 (neutral)
        const p1Balance = Math.abs(partner1Value);  // Distance from 0 for partner 1
        const p2Balance = Math.abs(partner2Value);  // Distance from 0 for partner 2
        // Max possible combined deviation is 6 (3 + 3), so divide by 6
        const balanceScore = Math.max(0, 100 - ((p1Balance + p2Balance) / 6) * 100);
        typeScores.BALANCE.score += balanceScore;
        typeScores.BALANCE.count += 1;
      }
    });

    // Calculate averages for each type
    const alignmentAvg = typeScores.ALIGNMENT.count > 0
      ? typeScores.ALIGNMENT.score / typeScores.ALIGNMENT.count
      : 0;
    const complementarityAvg = typeScores.COMPLEMENTARITY.count > 0
      ? typeScores.COMPLEMENTARITY.score / typeScores.COMPLEMENTARITY.count
      : 0;
    const balanceAvg = typeScores.BALANCE.count > 0
      ? typeScores.BALANCE.score / typeScores.BALANCE.count
      : 0;

    // Calculate weighted overall score
    const totalQuestions = typeScores.ALIGNMENT.count +
      typeScores.COMPLEMENTARITY.count +
      typeScores.BALANCE.count;

    const overallAlignment = totalQuestions > 0
      ? (alignmentAvg * typeScores.ALIGNMENT.count +
         complementarityAvg * typeScores.COMPLEMENTARITY.count +
         balanceAvg * typeScores.BALANCE.count) / totalQuestions
      : 0;

    // Return category results with full details
    return {
      categoryId: parseInt(categoryId),
      category: {
        ...categoryData.category,
        categoryId: parseInt(categoryId),
        questions: categoryQuestions
      },
      alignmentScore: Math.round(overallAlignment),
      types: {
        alignment: Math.round(alignmentAvg),
        complementarity: Math.round(complementarityAvg),
        balance: Math.round(balanceAvg),
      },
      questionCounts: {
        alignment: typeScores.ALIGNMENT.count,
        complementarity: typeScores.COMPLEMENTARITY.count,
        balance: typeScores.BALANCE.count,
        total: totalQuestions
      }
    };
  });

  return alignments;
}

export default calculateAlignments;