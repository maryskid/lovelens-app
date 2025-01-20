"use client";

import React, { useEffect, useState } from "react";
import PersonalityTraits from "@/app/_components/PersonalityTraits";
import ReportHeader from "@/app/_components/ReportHeader";
import Alignments from "@/app/_components/Alignments";
import UniqueDynamics from "@/app/_components/UniqueDynamics";
import GrowthOpportunities from "@/app/_components/GrowthOpportunities";
import NextChapterSection from "@/app/_components/NextChapterSection";
import { useUser } from "@/context/UserContext";
import { useSearchParams } from "next/navigation";
import SimpleLoading from "@/app/_components/SimpleLoading";
import { useRouter } from "next/navigation";


const Page = () => {
  const [reportData, setReportData] = useState(null);
  const { setUserData } = useUser();
  const searchParams = useSearchParams(); // Access query parameters from the URL
  const sessionId = searchParams.get("sessionId"); // Extract sessionId from query parameters
  const router = useRouter();


  useEffect(() => {
    setUserData(null); // Clear user data on load

    const fetchReportData = async () => {
      if(!sessionId) {
        return router.replace("/");
      }
      try {
        const res = await fetch(`/api/report?sessionId=${sessionId}`);
        const data = await res.json();
        if (res.ok) {
          setReportData(data);
        } else {
          console.error("Failed to fetch report data:", data.error);
        }
      } catch (error) {
        console.error("Error fetching report data:", error.message);
      }
    };

    fetchReportData();
  }, [sessionId, setUserData]);

  if (!reportData) {
    return <SimpleLoading />; // Show a loading state
  }

  const { firstUser, secondUser, alignments, uniqueDynamicsText, together } = reportData;

  return (
    <div className="bg-gray-100">
      <ReportHeader
        firstUser={firstUser}
        secondUser={secondUser}
        alignmentPercentage={
          Math.round(alignments.reduce((sum, a) => sum + a.alignmentPercentage, 0) / alignments.length)
        }
      />
      <PersonalityTraits firstUser={firstUser} secondUser={secondUser} />
      <Alignments userResults={alignments} />
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
