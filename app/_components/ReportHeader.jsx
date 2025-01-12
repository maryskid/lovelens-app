import React from "react";
import Image from "next/image";
import { guthenBloots, recoleta } from "@/fonts/typo";

const ReportHeader = ({ firstUser, secondUser, alignmentPercentage }) => {
  return (
    <section className="relative bg-[url('/couple-bg.jpg')] bg-cover bg-center py-24 md:py-24">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col items-center">
          {/* Name and Percentage */}
          <div className="flex items-center space-x-6">
            <h1
              className={`${guthenBloots.className} text-white text-3xl md:text-5xl font-bold`}
            >
              {firstUser.name} & {secondUser.name}
            </h1>
            <div className="relative w-20 h-20 md:w-28 md:h-28">
              <Image
                src="/fancy-square.png"
                alt="Alignment Percentage"
                layout="fill"
                className="object-contain"
              />
              <span
                className={`${guthenBloots.className} absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl md:text-5xl`}
              >
                {alignmentPercentage}%
              </span>
            </div>
          </div>

          {/* Subtitle */}
          <h2
            className={`${recoleta.className} text-white text-lg md:text-2xl font-medium mt-2`}
          >
            Your Relationship Alignment
          </h2>
        </div>
      </div>

      {/* Bottom Curve */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden z-0">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-20 fill-gray-100"
          preserveAspectRatio="none"
        >
          <path d="M0,0 C480,120 960,120 1440,0 L1440,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
};

export default ReportHeader;
