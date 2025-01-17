"use client";

import React, { useState, useEffect, useCallback } from "react";
import QuizHeader from "@/app/_components/QuizHeader";
import ProgressBar from "@/app/_components/ProgressBar";
import Category from "@/app/_components/Category";
import Loading from "@/app/_components/Loading";
import { fetchCategoriesWithQuestions } from "@/utils/fetchCategoriesWithQuestions";
import ProtectedQuizRoute from "@/app/_components/ProtectedQuizRoute";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

const Page = () => {
  // State management for quiz progress and data
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // User and routing context
  const { userData, getCookieData } = useUser();
  const router = useRouter();

  // Validate user data (checks session and cookie)
  const validateUserData = useCallback(() => {
    const cookieData = getCookieData();

    if (!userData && !cookieData) {
      router.replace("/"); // Redirect unauthenticated users
      return null;
    }

    return userData || cookieData; // Return the most reliable user data
  }, [userData, getCookieData, router]);

  // Fetch quiz data and validate the user on component mount
  useEffect(() => {
    const userInfo = validateUserData();
    if (!userInfo) return;

    console.log("User Info:", userInfo);

    const fetchData = async () => {
      try {
        const data = await fetchCategoriesWithQuestions();
        setCategories(data); // Populate categories with fetched data
      } catch (error) {
        console.error("Error fetching quiz categories:", error);
      }
    };

    fetchData();
  }, [validateUserData]);

  // Advance to the next category or submit the quiz
  const handleNextOrSubmit = async () => {
    if (currentCategoryIndex < categories.length - 1) {
      setCurrentCategoryIndex((prevIndex) => prevIndex + 1);
    } else {
      const userInfo = validateUserData();
      if (!userInfo) {
        router.replace("/");
        return;
      }

      const submissionData = { userData: userInfo, answers };
      await handleSubmit(submissionData);
    }
  };

  // Go back to the previous category
  const handlePrevious = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex((prevIndex) => prevIndex - 1);
    }
  };

  // Submit the quiz responses to the backend
  const handleSubmit = async (submissionData) => {
    setIsSubmitting(true);

    const payload = {
      first_name: submissionData.userData.firstName,
      email: submissionData.userData.email,
      gender: submissionData.userData.gender,
      answers: Object.entries(submissionData.answers).map(([questionId, answer]) => ({
        questionId,
        answer,
      })),
    };

    try {
      const endpoint = submissionData.userData.code
        ? "/api/join-quiz"
        : "/api/create-quiz"; // Dynamically select the endpoint

      // Add the session code to the payload for join-quiz
      if (submissionData.userData.code) {
        payload.code = submissionData.userData.code;
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();

        if (!submissionData.userData.code) {
          // Redirect to the Code Page for initiators
          router.push(`/code?uniqueCode=${data.sessionUniqueCode}&firstName=${encodeURIComponent(submissionData.userData.firstName)}`);
        } else {
          // Redirect to the quiz completion page for partners
          router.push("/report");
        }
     
      } else {
        console.error("Error submitting quiz:", response.statusText);
        alert("There was an issue submitting your quiz. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading indicator while fetching categories
  if (!categories || categories.length === 0) {
    return <Loading />;
  }

  return (
    <ProtectedQuizRoute>
      {/* Header for the quiz */}
      <QuizHeader />

      {/* Progress bar for quiz progress */}
      <ProgressBar
        categories={categories}
        answers={answers}
        currentCategoryIndex={currentCategoryIndex}
      />

      {/* Render the current category of questions */}
      <Category
        category={categories[currentCategoryIndex]}
        onNextOrSubmit={handleNextOrSubmit}
        onPrevious={handlePrevious}
        isLastCategory={currentCategoryIndex === categories.length - 1}
        answers={answers}
        setAnswers={setAnswers}
      />
    </ProtectedQuizRoute>
  );
};

export default Page;
