import React from "react";
import PersonalityTraits from "@/app/_components/PersonalityTraits";
import ReportHeader from "@/app/_components/ReportHeader";
import userResults from "@/app/_data/userResults";
import Alignments from "@/app/_components/Alignments";
import UniqueDynamics from "@/app/_components/UniqueDynamics";
import GrowthOpportunities from "@/app/_components/GrowthOpportunities";
import NextChapterSection from "@/app/_components/NextChapterSection"; // Import the new section
import usersTraits from "@/app/_data/usersTraits";
import uniqueDynamicsText from "@/app/_data/uniqueDynamicsText";

const Page = () => {
  const { firstUser, secondUser, together } = usersTraits;

  const alignmentPercentage = 78;

  return (
    <div className="bg-gray-100">
      <ReportHeader
        firstUser={firstUser}
        secondUser={secondUser}
        alignmentPercentage={alignmentPercentage}
      />
      <PersonalityTraits firstUser={firstUser} secondUser={secondUser} />
      <Alignments userResults={userResults} />
      <NextChapterSection />
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
