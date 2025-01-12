"use client";

import React, { useState } from "react";
import PersonalityCard from "@/app/_components/PersonalityCard";
import { Mail } from "lucide-react"; // Import the Mail icon
import { recoleta } from "@/fonts/typo";

const PersonalityTraits = ({ firstUser, secondUser }) => {
  const [cardStates, setCardStates] = useState({
    firstUser: { isExpanded: false, selectedTrait: firstUser.traits[0] },
    secondUser: { isExpanded: false, selectedTrait: secondUser.traits[0] },
  });

  const handleToggle = (userKey) => {
    setCardStates((prevState) => ({
      ...prevState,
      [userKey]: {
        ...prevState[userKey],
        isExpanded: !prevState[userKey].isExpanded,
      },
    }));
  };

  const handleSelectTrait = (userKey, trait) => {
    setCardStates((prevState) => ({
      ...prevState,
      [userKey]: {
        ...prevState[userKey],
        selectedTrait: trait,
      },
    }));
  };

  return (
    <div className="space-y-6 px-6 md:px-12 py-8">
      {/* Title Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-100 text-orange-500 font-bold mr-4">
            1
          </div>
          <h2 className={`${recoleta.className} text-2xl font-bold text-gray-800`}>
            Personality Traits
          </h2>
        </div>
        <button
          onClick={() => alert("Sending via email!")}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-100 text-orange-500 hover:bg-orange-200 transition"
          title="Send via email"
        >
          <Mail className="w-5 h-5" />
        </button>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PersonalityCard
          person={firstUser}
          isExpanded={cardStates.firstUser.isExpanded}
          onToggle={() => handleToggle("firstUser")}
          selectedTrait={cardStates.firstUser.selectedTrait}
          onSelectTrait={(trait) => handleSelectTrait("firstUser", trait)}
        />
        <PersonalityCard
          person={secondUser}
          isExpanded={cardStates.secondUser.isExpanded}
          onToggle={() => handleToggle("secondUser")}
          selectedTrait={cardStates.secondUser.selectedTrait}
          onSelectTrait={(trait) => handleSelectTrait("secondUser", trait)}
        />
      </div>
    </div>
  );
};

export default PersonalityTraits;
