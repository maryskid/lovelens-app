"use client";
import React, { useEffect } from "react";
import PersonalityTraits from "@/app/_components/PersonalityTraits";
import ReportHeader from "@/app/_components/ReportHeader";
import userResults from "@/app/_data/userResults";
import Alignments from "@/app/_components/Alignments";
import UniqueDynamics from "@/app/_components/UniqueDynamics";
import GrowthOpportunities from "@/app/_components/GrowthOpportunities";
import usersTraits from "@/app/_data/usersTraits";
import uniqueDynamicsText from "@/app/_data/uniqueDynamicsText";
import { useUser } from "@/context/UserContext";

const Page = () => {
  const { firstUser, secondUser, together } = usersTraits;

  const { setUserData } = useUser(); // Use setUserData to clear user data

  const alignmentPercentage = 78;

  // Clear userData when the page loads
  useEffect(() => {
    setUserData(null);
  }, [setUserData]);
  

  return (
    <div className="bg-gray-100">
      <ReportHeader
        firstUser={firstUser}
        secondUser={secondUser}
        alignmentPercentage={alignmentPercentage}
      />
      <PersonalityTraits firstUser={firstUser} secondUser={secondUser} />
      <Alignments userResults={userResults} />
      <UniqueDynamics uniqueDynamics={uniqueDynamicsText} />
      <GrowthOpportunities
        firstUser={firstUser}
        secondUser={secondUser}
        togetherOpportunity={together.growthOpportunity}
      />
    </div>
  );
};

export default Page;