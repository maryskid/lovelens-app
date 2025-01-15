"use client";

import React from "react";
import { Sparkles, ChevronRight } from "lucide-react";
import Image from "next/image";
import { recoleta } from "@/fonts/typo";

const NextChapterSection = () => {
  const handleBookClick = () => {
    // Add affiliate link here
    window.open("your-affiliate-link", "_blank");
  };

  return (
    <div className="px-6 md:px-24 pt-8 pb-16">
      <div className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 relative overflow-hidden rounded-2xl px-6 sm:px-8 py-10 shadow-xl">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-12 -mb-12 blur-3xl"></div>
        
        <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Text Content */}
          <div className="text-left flex-1">
            <p className="text-sm uppercase tracking-wide text-white font-medium mb-2 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 animate-pulse" /> Recommended For You
            </p>
            <h2 className={`${recoleta.className} text-4xl font-bold text-white mb-6`}>
              Ready for Daily Adventures Together?
            </h2>
            <p className="text-xl text-gray-100 mb-8">
              Based on the relationship's alignment, we highly recommend you The Couple's Book of Challenges, in this book you'll find 365 exciting activities for :
            </p>
            <ul className="list-disc list-inside text-gray-100 text-lg space-y-4">
              <li>Deepen your connection daily</li>
              <li>Create unforgettable moments together</li>
              <li>Discover new sides of each other</li>
              <li>Have fun while growing closer</li>
            </ul>
          </div>

          {/* Gallery and CTA */}
          <div className="flex-shrink-0 text-center lg:text-left flex-1">
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                "/couple-challenges-book1.jpg",
                "/couple-challenges-book2.jpg",
                "/couple-challenges-book3.jpg",
                "/couple-challenges-book4.jpg",
              ].map((src, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300"
                >
                  <Image
                    src={src}
                    alt={`The Couple's Challenge Book ${index + 1}`}
                    width={400}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={handleBookClick}
              className="group bg-white text-orange-600 font-semibold py-4 px-10 
                rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300
                flex items-center space-x-3 mx-auto lg:mx-0
                hover:bg-opacity-95 transform hover:-translate-y-1"
            >
              <span className="text-gradient bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Get the Book</span>
              <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2 text-orange-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextChapterSection;
