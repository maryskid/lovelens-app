"use client";

import React from "react";

const Question = ({ question, onAnswer, userAnswer }) => {
  const scale = [-3, -2, -1, 0, 1, 2, 3];

  const sizeMap = {
    "-3": "w-10 h-10",
    "-2": "w-8 h-8",
    "-1": "w-6 h-6",
    "0": "w-4 h-4",
    "1": "w-6 h-6",
    "2": "w-8 h-8",
    "3": "w-10 h-10",
  };

  return (
    <div className="border-b border-gray-300 py-4">
      <p className="text-base md:text-lg font-medium mb-4">{question.text}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">{question.left}</span>
        <div className="flex items-center space-x-2">
          {scale.map((value) => (
            <button
              key={value}
              onClick={() => onAnswer(question.id, value)}
              className={`${sizeMap[value]} rounded-full border ${
                userAnswer === value
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-600 border-gray-300"
              } hover:bg-primary hover:text-white transition`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-500">{question.right}</span>
      </div>
    </div>
  );
};

export default Question;
