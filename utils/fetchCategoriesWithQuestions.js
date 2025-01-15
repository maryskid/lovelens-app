import supabase from "@/configs/supabaseClient";

export async function fetchCategoriesWithQuestions() {
  try {
    // Fetch categories and their questions
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('id, title, description, questions:questions_reference(id, type, question_text, metadata)')
      .order('id', { ascending: true });

    if (categoriesError) {
      throw categoriesError;
    }

    // Format the data to match a structure
    const formattedCategories = categories.map((category) => ({
      id: category.id,
      title: category.title,
      description: category.description,
      questions: category.questions.map((question) => ({
        id: question.id,
        type: question.type,
        text: question.question_text,
        left: question.metadata.spectrum_start,
        right: question.metadata.spectrum_end,
      })),
    }));

    return formattedCategories;
  } catch (error) {
    console.error('Error fetching categories and questions:', error);
    throw error;
  }
}
