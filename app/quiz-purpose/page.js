"use client";

import React, { useState } from "react";
import Image from "next/image";
import { recoleta, guthenBloots } from "@/fonts/typo";

const Page = () => {
  const [selectedReason, setSelectedReason] = useState(null);

  const reasons = [
    {
      icon: "/compatibility.png",
      title: "Understanding Compatibility",
      description: "I want to understand our compatibility better",
      color: "#F97316", // orange
    },
    {
      icon: "/transition.png",
      title: "Life Transition",
      description: "We're going through a major life change (moving in, marriage, etc.)",
      color: "#10B981", // green
    },
    {
      icon: "/communication.png",
      title: "Better Communication",
      description: "I want to improve how we communicate",
      color: "#3B82F6", // blue
    },
    {
      icon: "/conflict.png",
      title: "Resolving Conflicts",
      description: "We're having recurring disagreements",
      color: "#8B5CF6", // purple
    },
    {
      icon: "/growth.png",
      title: "Relationship Growth",
      description: "We're doing well but want to grow stronger",
      color: "#EC4899", // pink
    },
    {
      icon: "/prevention.png",
      title: "Prevention",
      description: "Want to prevent future relationship issues",
      color: "#06B6D4", // teal
    },
    {
      icon: "/therapy.png",
      title: "Seeking Help",
      description: "Considering professional relationship support",
      color: "#EF4444", // red
    },
    {
      icon: "/curiosity.png",
      title: "Just Curious",
      description: "Want to learn more about our dynamic",
      color: "#F59E0B", // amber
    },
  ];

  const handleReasonClick = (reason) => {
    setSelectedReason(reason.title);
    console.log("Selected reason:", reason.title);
  };

  return (
    <div className="bg-gradient-to-b from-[#F8F4F2] via-[#FFF] to-[#F8F4F2] py-12 px-6 md:px-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1
          className={`${recoleta.className} text-3xl md:text-4xl font-bold text-primary`}
        >
          Why are you taking this quiz?
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mt-4">
          Select the reason that best describes your situation.
        </p>
      </div>

      {/* Reasons Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {reasons.map((reason, index) => (
          <div
            key={index}
            onClick={() => handleReasonClick(reason)}
            className={`bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center space-y-4 border-t-4 cursor-pointer transform transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
              selectedReason === reason.title ? 'ring-2 ring-opacity-50' : ''
            }`}
            style={{ 
              borderColor: reason.color,
              backgroundColor: selectedReason === reason.title ? `${reason.color}10` : 'white',
              ringColor: reason.color
            }}
          >
            <Image
              src={reason.icon}
              alt={reason.title}
              width={60}
              height={60}
              className="w-14 h-14"
            />
            <h3
              className={`${recoleta.className} text-lg font-bold`}
              style={{ color: reason.color }}
            >
              {reason.title}
            </h3>
            <p className="text-sm text-gray-600">{reason.description}</p>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <div className="text-center mt-12">
        <button
          className={`bg-orange-500 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-orange-600 transition-all duration-200 ${
            !selectedReason ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={() => selectedReason && console.log("Continuing with reason:", selectedReason)}
          disabled={!selectedReason}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Page;