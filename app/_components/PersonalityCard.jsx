"use client";

import React, { useState } from "react";
import { recoleta } from "@/fonts/typo";

const PersonalityCard = ({ person, isExpanded, onToggle, selectedTrait, onSelectTrait }) => {
  const traitColors = {
    "Organizational Style": "#F97316",
    "Communication Approach": "#10B981",
    "Intimacy Dynamics": "#F59E0B",
    "Growth Orientation": "#8B5CF6",
    "Social Interaction": "#3B82F6",
    "Future Vision": "#06B6D4",
    "Parenting Philosophy": "#EC4899",
    "Financial Mindset": "#EF4444",
  };

  return (
    <div className={`bg-white rounded-lg p-4 flex flex-col shadow-md ${isExpanded ? "h-auto" : "h-fit"}`}>
      {/* Title, Description, and Avatar (Now on Top) */}
      <div className="flex items-center mb-4">
        <img
          src={person.avatar}
          alt={`${person.name}'s Avatar`}
          className="w-16 h-16 rounded-full ring-2 ring-gray-200 mr-4"
        />
         <h3 className={`${recoleta.className} text-lg font-bold mb-2 text-gray-800`}>
            {person.name}'s Traits
          </h3>
        <div>
          <p className="text-sm text-gray-600 leading-relaxed">{person.description}</p>
        </div>
      </div>

      {/* Selected Trait Description */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <h3 className={`${recoleta.className} text-lg font-bold mb-2 text-gray-800`}>
          {selectedTrait.name}
        </h3>
        <h4 className="text-xl font-bold mb-4" style={{ color: traitColors[selectedTrait.name] }}>
          {selectedTrait.labels[
            Object.keys(selectedTrait.labels).find(
              (key) => selectedTrait.labels[key].isDominant
            )
          ]?.value}
          %{" "}
          {Object.keys(selectedTrait.labels).find(
            (key) => selectedTrait.labels[key].isDominant
          )}
        </h4>
        <p className="text-sm text-gray-600">{selectedTrait.description}</p>
      </div>

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="mb-4 text-sm font-semibold text-gray-600 hover:underline"
      >
        {isExpanded ? "Show Less" : "See More"}
      </button>

      {/* Progress Bars */}
      <div className="flex-1">
        {person.traits
          .slice(0, isExpanded ? person.traits.length : 3)
          .map((trait) => {
            const dominantLabel = Object.entries(trait.labels).find(
              ([, data]) => data.isDominant
            );
            const nonDominantLabel = Object.entries(trait.labels).find(
              ([, data]) => !data.isDominant
            );

            return (
              <div
                key={trait.name}
                onClick={() => onSelectTrait(trait)}
                className={`mb-4 cursor-pointer p-2 rounded-lg transition-all duration-200 ${
                  selectedTrait.name === trait.name ? "bg-opacity-20" : "hover:bg-gray-50"
                }`}
                style={{
                  backgroundColor:
                    selectedTrait.name === trait.name
                      ? `${traitColors[trait.name]}33`
                      : "transparent",
                }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-700">{trait.name}</span>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: traitColors[trait.name] }}
                  >
                    {dominantLabel[1].value}% {dominantLabel[0]}
                  </span>
                </div>
                <div className="relative h-2 bg-gray-200 rounded-full">
                  <div
                    className="absolute top-0 h-full rounded-full"
                    style={{
                      backgroundColor: traitColors[trait.name],
                      width: `${dominantLabel[1].value}%`,
                      [dominantLabel[0] === "right" ? "right" : "left"]: "0",
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>{nonDominantLabel[0]}</span>
                  <span>{dominantLabel[0]}</span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PersonalityCard;
