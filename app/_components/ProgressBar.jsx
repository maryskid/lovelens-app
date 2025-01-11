"use client";

import React from "react";

const ProgressBar = ({ categories, currentCategoryIndex, answers }) => {
  // Calculate the progress of each category
  const calculateCategoryProgress = (category) => {
    const totalQuestions = category.questions.length;
    const answeredQuestions = category.questions.filter(
      (q) => answers[q.id] !== undefined
    ).length;

    return Math.round((answeredQuestions / totalQuestions) * 100);
  };

  // Calculate the overall progress
  const overallProgress = () => {
    const totalQuestions = categories.reduce(
      (total, category) => total + category.questions.length,
      0
    );
    const answeredQuestions = Object.keys(answers).length;

    return Math.round((answeredQuestions / totalQuestions) * 100);
  };

  return (
    <div className="w-full lg:w-4/5 px-6 md:px-32 mt-6 mx-auto">
      {/* Desktop Progress Bar */}
      <div className="hidden lg:flex justify-between items-center gap-6">
        {categories.map((category, index) => {
          const progress = calculateCategoryProgress(category);
          const isCurrent = index === currentCategoryIndex;

          return (
            <div key={category.id} className="flex-1 text-center">
              <div className="relative w-full h-2 bg-gray-300 rounded-full">
                <div
                  className={`h-2 rounded-full bg-primary transition-all`}
                  style={{
                    width: `${
                      index < currentCategoryIndex
                        ? "100%"
                        : index === currentCategoryIndex
                        ? `${progress}%`
                        : "0%"
                    }`,
                  }}
                />
              </div>
              <p
                className={`mt-2 text-xs ${
                  isCurrent ? "font-bold text-primary" : "text-gray-400"
                }`}
              >
                {category.title}
              </p>
            </div>
          );
        })}
      </div>

      {/* Mobile Progress Bar */}
      <div className="lg:hidden mt-4">
        <div className="relative w-full h-2 bg-gray-300 rounded-full">
          <div
            className="h-2 rounded-full bg-primary transition-all"
            style={{ width: `${overallProgress()}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 text-center mt-2">
          Progress: {overallProgress()}%
        </p>
      </div>
    </div>
  );
};

export default ProgressBar;
