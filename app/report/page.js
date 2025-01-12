 import React from "react";
import PersonalityTraits from "@/app/_components/PersonalityTraits";
import ReportHeader from "@/app/_components/ReportHeader";
import userResults from "@/app/_data/userResults";
import Alignments from "@/app/_components/Alignments";
import usersTraits from "@/app/_data/usersTraits";

const Page = () => {
  const { firstUser, secondUser } = usersTraits;

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
    </div>
  );
};

export default Page;
