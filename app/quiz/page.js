"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import QuizHeader from "@/app/_components/QuizHeader";
import ProgressBar from "@/app/_components/ProgressBar";
import Category from "@/app/_components/Category";
import QuestionsLoading from "@/app/_components/QuestionsLoading";
import { fetchCategoriesWithQuestions } from "@/utils/fetchCategoriesWithQuestions";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import ProcessingResults from "@/app/_components/ProcessingResults";

const Page = () => {
  /**
   * We keep multiple UI flags in a single object to avoid intermediate re-renders:
   * - isLoading:   whether we're fetching initial quiz data
   * - isProcessing: whether we're submitting quiz responses
   * - hasSubmitted: whether the quiz has been submitted (prevents re-fetch)
   */
  const [quizState, setQuizState] = useState({
    isLoading: true,
    isProcessing: false,
    hasSubmitted: false,
  });

  // Manages category navigation and user answers.
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [categories, setCategories] = useState([]);

  // Access context and routing tools.
  const router = useRouter();
  const { userData, getCookieData } = useUser();

  // A ref to track if we have begun navigation (so we skip further actions).
  const isNavigating = useRef(false);

  /**
   * Validates user data from context or cookies.
   * If not valid, we redirect to the home page ("/").
   */
  const validateUserData = useCallback(() => {
    const cookieData = getCookieData();
    if (!userData && !cookieData) {
      router.replace("/");
      return null;
    }
    return userData || cookieData;
  }, [userData, getCookieData, router]);

  /**
   * Fetches categories once, unless we've already submitted
   * or we have started navigation away.
   */
  useEffect(() => {
    if (quizState.hasSubmitted || isNavigating.current) {
      // Skip fetching if we've submitted the quiz or if we're leaving.
      return;
    }

    const userInfo = validateUserData();
    if (!userInfo) return;

    const fetchData = async () => {
      try {
        // Fetch quiz categories (and any other required data).
        const data = await fetchCategoriesWithQuestions();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching quiz categories:", error);
      } finally {
        // Turn off the initial loading state after fetch completes or fails.
        setQuizState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    fetchData();
  }, [validateUserData, quizState.hasSubmitted]);

  /**
   * Moves user to the next category, or if on the last category, submits the quiz.
   */
  const handleNextOrSubmit = async () => {
    if (currentCategoryIndex < categories.length - 1) {
      setCurrentCategoryIndex((prevIndex) => prevIndex + 1);
    } else {
      // If we're on the last category, submit the quiz.
      const userInfo = validateUserData();
      if (!userInfo) return;

      // Turn on the "processing" state so we show ProcessingResults.
      setQuizState((prev) => ({ ...prev, isProcessing: true }));

      const submissionData = { userData: userInfo, answers };
      await handleSubmit(submissionData);
    }
  };

  /**
   * Moves the user to the previous category, if not already at the first one.
   */
  const handlePrevious = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex((prevIndex) => prevIndex - 1);
    }
  };

  /**
   * Marks that navigation has started, then immediately routes to the new path.
   */
  const navigateAway = useCallback((path) => {
    isNavigating.current = true;
    router.push(path);
  }, [router]);

  /**
   * Handles the actual quiz submission: posts data to our API.
   * IMPORTANT: we do NOT set isProcessing to false on success, so we remain on
   * ProcessingResults until the user fully navigates to the new page.
   */
  const handleSubmit = async (submissionData) => {
    if (isNavigating.current) return;

    try {
      const payload = {
        first_name: submissionData.userData.firstName,
        email: submissionData.userData.email,
        gender: submissionData.userData.gender,
        answers: Object.entries(submissionData.answers).map(([questionId, answer]) => ({
          questionId,
          answer,
        })),
      };

      // Decide which endpoint to hit based on whether there's a code.
      const endpoint = submissionData.userData.code ? "/api/join-quiz" : "/api/create-quiz";
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

        // Decide where to send the user after a successful submission.
        const redirectPath = submissionData.userData.code
          ? "/report"
          : `/code?uniqueCode=${data.sessionUniqueCode}&firstName=${encodeURIComponent(
              submissionData.userData.firstName
            )}`;

        // Only set hasSubmitted = true, so we skip future fetches.
        // We keep isProcessing = true so we remain on the ProcessingResults screen
        // until the user fully navigates away, preventing a flicker of the quiz UI.
        setQuizState((prev) => ({
          ...prev,
          hasSubmitted: true,
        }));

        // Navigate away immediately; no flicker of the quiz UI before leaving.
        navigateAway(redirectPath);

      } else {
        // If there's an error, let the user see the quiz again.
        console.error("Error submitting quiz:", response.statusText);
        alert("There was an issue submitting your quiz. Please try again.");
        setQuizState((prev) => ({ ...prev, isProcessing: false }));
      }
    } catch (error) {
      // Handle network or unexpected errors.
      console.error("Error submitting quiz:", error);
      alert("An unexpected error occurred. Please try again.");
      setQuizState((prev) => ({ ...prev, isProcessing: false }));
    }
  };

  // ----------------------------------
  // CONDITIONAL RENDERING
  // ----------------------------------

  // If the quiz is still fetching categories, show the loading screen.
  if (quizState.isLoading) {
    return <QuestionsLoading />;
  }

  // If the user clicked submit, and submission is in progress (or finished but hasn't left yet),
  // remain on the ProcessingResults screen.
  if (quizState.isProcessing) {
    return <ProcessingResults isPartner={!!userData?.code} />;
  }

  // Otherwise, render the main quiz UI (either taking it or re-taking it if there's an error).
  return (
    <>
      <QuizHeader />
      <ProgressBar
        categories={categories}
        answers={answers}
        currentCategoryIndex={currentCategoryIndex}
      />
      <Category
        category={categories[currentCategoryIndex]}
        onNextOrSubmit={handleNextOrSubmit}
        onPrevious={handlePrevious}
        isLastCategory={currentCategoryIndex === categories.length - 1}
        answers={answers}
        setAnswers={setAnswers}
      />
    </>
  );
};

export default Page;
