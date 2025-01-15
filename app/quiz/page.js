"use client";

import React, { useState, Suspense } from "react";
import QuizHeader from "@/app/_components/QuizHeader";
import ProgressBar from "@/app/_components/ProgressBar";
import Category from "@/app/_components/Category";
import Loading from "@/app/_components/Loading";
import { fetchCategoriesWithQuestions } from "@/utils/fetchCategoriesWithQuestions";

const Page = () => {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [categories, setCategories] = useState([]);

  const fetchData = async () => {
    try {
      const data = await fetchCategoriesWithQuestions();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching quiz questions:", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleNext = () => {
    if (currentCategoryIndex < categories.length - 1) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
    } else {
      console.log("Submit Answers:", answers);
    }
  };

  const handlePrevious = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(currentCategoryIndex - 1);
    }
  };

  if (!categories || categories.length === 0) {
    return <Loading />;
  }

  return (
    <div>
      <QuizHeader />
      <Suspense fallback={<Loading />}>
        <ProgressBar
          categories={categories}
          answers={answers}
          currentCategoryIndex={currentCategoryIndex}
        />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Category
          category={categories[currentCategoryIndex]}
          onNext={handleNext}
          onPrevious={handlePrevious}
          isLastCategory={currentCategoryIndex === categories.length - 1}
          answers={answers}
          setAnswers={setAnswers}
        />
      </Suspense>
    </div>
  );
};

export default Page;
