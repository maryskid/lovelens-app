"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { recoleta } from "@/fonts/typo";
import { Mail, Copy, Check, Sparkles, Share2, ArrowRight } from "lucide-react";

const Page = () => {
  const [copied, setCopied] = useState(false);
  const searchParams = useSearchParams();
  const uniqueCode = searchParams.get("uniqueCode") || "";
  const firstName = searchParams.get("firstName") || "";


  const messagePreview = `Hey! I just completed the LoveLens relationship quiz and would love to see how our perspectives align. Here's my code to take your part: ${uniqueCode}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(uniqueCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEmailClick = () => {
    const mailtoLink = `mailto:?subject=LoveLens Quiz Code&body=${encodeURIComponent(
      messagePreview
    )}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F4F2] via-[#FFF] to-[#F8F4F2] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Celebration Header */}
        <div className="text-center mb-12">
          <div className="inline-block animate-bounce mb-4">
            <Sparkles className="w-12 h-12 text-orange-500" />
          </div>
          <h1 className={`${recoleta.className} text-4xl md:text-5xl font-bold text-gray-800 mb-4`}>
            Amazing work, {firstName}! 🎉
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            You've taken the first step towards deeper understanding.
          </p>
        </div>

        {/* Code Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Share Your Unique Code</h2>
            <p className="text-gray-600">Let your partner join the journey.</p>
          </div>

          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="bg-orange-50 px-6 py-4 rounded-lg border-2 border-orange-100 flex items-center justify-center text-center">
              <span className="text-2xl font-bold text-orange-600 tracking-wider">{uniqueCode}</span>
            </div>
            <button
              onClick={handleCopyCode}
              className="bg-primary hover:bg-orange-600 text-white px-6 py-4 rounded-lg transition-all duration-200 flex items-center space-x-2 shadow-md"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <button
            onClick={handleEmailClick}
            className=" w-4/5 md:w-1/3 mx-auto bg-gradient-to-r from-primary to-orange-600 text-white py-4 rounded-xl font-semibold shadow-md hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center justify-center space-x-3"
          >
            <Mail className="w-5 h-5" />
            <span>Share via Email</span>
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Message Preview Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Message Preview</h3>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-gray-700">{messagePreview}</p>
          </div>
        </div>

        {/* Next Steps Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <span>Your Journey Continues</span>
            <ArrowRight className="w-5 h-5 ml-2 text-orange-500" />
          </h3>
          <div className="space-y-6">
            {[
              { step: 1, text: "Share your unique code with your partner." },
              { step: 2, text: "Wait for them to complete their part of the quiz." },
              { step: 3, text: "Receive your personalized relationship insights." },
              { step: 4, text: "Start a meaningful conversation together." },
            ].map(({ step, text }) => (
              <div key={step} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 font-semibold">{step}</span>
                </div>
                <p className="text-gray-700 pt-1">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
