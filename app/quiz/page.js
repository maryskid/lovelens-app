"use client";

import React, { useState } from "react";
import QuizHeader from "@/app/_components/QuizHeader";
import Category from "@/app/_components/Category";
import ProgressBar from "@/app/_components/ProgressBar";
import categories from "@/app/_data/categories";

const Page = () => {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [answers, setAnswers] = useState({});

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

  return (
    <div>
      <QuizHeader />
      <ProgressBar
        categories={categories}
        answers={answers}
        currentCategoryIndex={currentCategoryIndex}
      />
      <Category
        category={categories[currentCategoryIndex]}
        onNext={handleNext}
        onPrevious={handlePrevious}
        isLastCategory={currentCategoryIndex === categories.length - 1}
        answers={answers}
        setAnswers={setAnswers}
      />
    </div>
  );
};

export default Page;
