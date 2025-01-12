"use client";

import React from "react";
import CategoryCard from "./CategoryCard";
import { Mail } from "lucide-react"; // Import the Mail icon
import { recoleta } from "@/fonts/typo";

const traitColors = {
  "Daily life": "#F97316",
  "Communication": "#10B981",
  "Intimacy": "#F59E0B",
  "Growth": "#8B5CF6",
  "Social life": "#3B82F6",
  "Future goals": "#06B6D4",
  "Parenting values": "#EC4899",
  "Finances": "#EF4444",
};

const Alignments = ({ userResults }) => {
  return (
    <div className="space-y-6 px-6 md:px-24 py-8">
      {/* Title Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-500 font-bold mr-4">
            2
          </div>
          <h2 className={`${recoleta.className} text-2xl font-bold text-gray-800`}>
            Alignments analytics & Suggestions
          </h2>
        </div>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {userResults.map((userResult, index) => (
          <CategoryCard
            key={index}
            {...userResult}
            color={traitColors[userResult.name] || "#000"}
          />
        ))}
      </div>
    </div>
  );
};

export default Alignments;
