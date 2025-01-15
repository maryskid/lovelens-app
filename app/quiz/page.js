"use client";

import React, { useState, useEffect } from "react";
import QuizHeader from "@/app/_components/QuizHeader";
import ProgressBar from "@/app/_components/ProgressBar";
import Category from "@/app/_components/Category";
import Loading from "@/app/_components/Loading";
import { fetchCategoriesWithQuestions } from "@/utils/fetchCategoriesWithQuestions";
import ProtectedQuizRoute from "@/app/_components/ProtectedQuizRoute";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

const Page = () => {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0); // Current category being displayed
  const [answers, setAnswers] = useState({}); // User's answers to the quiz questions
  const [categories, setCategories] = useState([]); // Quiz categories and their associated questions
  const { userData, getCookieData } = useUser(); // Access user data and cookie retrieval method
  const router = useRouter(); // For navigation and redirection

  // Validate user data to ensure only authenticated/valid users access the quiz page
  const validateUserData = () => {
    const cookieData = getCookieData();

    if (!userData && !cookieData) {
      // Case 1: No `userData` or cookie - redirect to the home page
      router.replace("/");
      return null;
    }

    if (userData && !cookieData) {
      // Case 2: `userData` exists but no cookie - uncommon case, prioritize `userData`
      return userData;
    }

    if (!userData && cookieData) {
      // Case 3: Cookie exists but no `userData` (e.g., page refresh) - use cookie data
      return cookieData;
    }

    // Case 4: Both `userData` and cookie exist - return either (they should be identical)
    return userData;
  };

  // Fetch quiz data when the component mounts and validate user data
  useEffect(() => {
    const userInfo = validateUserData();
    if (!userInfo) return; // If validation fails, user is redirected

    const fetchData = async () => {
      try {
        const data = await fetchCategoriesWithQuestions(); // Fetch categories and questions from the backend
        setCategories(data); // Update categories state
      } catch (error) {
        console.error("Error fetching quiz questions:", error); // Log any errors
      }
    };

    fetchData();
  }, []);

  // Handle advancing to the next category or submitting the quiz
  const handleNextOrSubmit = () => {
    if (currentCategoryIndex < categories.length - 1) {
      // Move to the next category if there are more categories
      setCurrentCategoryIndex(currentCategoryIndex + 1);
    } else {
      const userInfo = validateUserData();
      if (!userInfo) {
        router.replace("/"); // Redirect if user validation fails
        return;
      }

      // Prepare data for backend submission
      const submissionData = {
        userData: userInfo,
        answers: answers,
      };

      console.log("Submit Data:", submissionData);
      // Add backend submission logic here
    }
  };

  // Handle returning to the previous category
  const handlePrevious = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(currentCategoryIndex - 1);
    }
  };

  // Show a loading indicator if categories are not yet loaded
  if (!categories || categories.length === 0) {
    return <Loading />;
  }

  return (
    <ProtectedQuizRoute>
      {/* Quiz Header */}
      <QuizHeader />

      {/* Progress Bar */}
      <ProgressBar
        categories={categories}
        answers={answers}
        currentCategoryIndex={currentCategoryIndex}
      />

      {/* Quiz Category */}
      <Category
        category={categories[currentCategoryIndex]} // Current category to display
        onNextOrSubmit={handleNextOrSubmit} // Handler for advancing to the next category
        onPrevious={handlePrevious} // Handler for returning to the previous category
        isLastCategory={currentCategoryIndex === categories.length - 1} // Check if this is the last category
        answers={answers} // Current user answers
        setAnswers={setAnswers} // Update answers
      />
    </ProtectedQuizRoute>
  );
};

export default Page;
