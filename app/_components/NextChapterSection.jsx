"use client";

import React, { useState } from "react";
import { Sparkles, ChevronRight, Heart, ChevronLeft } from "lucide-react";
import Image from "next/image";
import { recoleta } from "@/fonts/typo";

const NextChapterSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleBookClick = () => {
    window.open("your-affiliate-link", "_blank");
  };

  const images = [
    {
      src: "/couple-challenges-book1.jpg",
      alt: "Couple enjoying a sunset challenge",
      caption: "Daily Connection Challenges"
    },
    {
      src: "/couple-challenges-book2.jpg",
      alt: "Couple cooking together challenge",
      caption: "Creative Date Ideas"
    },
    {
      src: "/couple-challenges-book3.jpg",
      alt: "Couple adventure challenge",
      caption: "Adventure Together"
    },
    {
      src: "/couple-challenges-book4.jpg",
      alt: "Couple creative date challenge",
      caption: "Strengthen Your Bond"
    }
  ];

  return (
    <section className="px-6 md:px-24 pt-8 pb-16">
      <div className="bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 relative overflow-hidden rounded-2xl px-6 sm:px-12 py-12 shadow-xl">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full -ml-36 -mb-36 blur-3xl"></div>
        </div>
        
        <div className="relative flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text Content */}
          <div className="text-left flex-1 max-w-xl">
            <div className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-4">
              <p className="text-sm uppercase tracking-wide text-white font-medium flex items-center">
                <Sparkles className="w-4 h-4 mr-2 animate-pulse" /> 
                <span>Recommended For You</span>
              </p>
            </div>

            <h2 className={`${recoleta.className} text-4xl md:text-5xl font-bold text-white mb-8 leading-tight`}>
              Ready for Daily Adventures Together?
            </h2>

            <p className="text-xl text-gray-100 mb-8 leading-relaxed">
              Based on your relationship's alignment, we highly recommend The Couple's Book of Challenges. Discover 365 exciting activities designed to:
            </p>

            <ul className="space-y-4 mb-8">
              {[
                "Deepen your connection daily",
                "Create unforgettable moments together",
                "Discover new sides of each other",
                "Have fun while growing closer"
              ].map((item, index) => (
                <li key={index} className="flex items-center text-gray-100 text-lg">
                  <Heart className="w-5 h-5 mr-3 text-orange-200" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Gallery - Desktop Version */}
          <div className="flex-1 w-full max-w-sm hidden lg:block">
            <div className="relative h-[600px] overflow-hidden rounded-2xl">
              {/* First Column */}
              <div className="absolute left-0 w-[48%] h-full">
                <div className="animate-scroll-up">
                  <div className="flex flex-col gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative group aspect-[3/4] overflow-hidden rounded-xl shadow-lg">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Second Column */}
              <div className="absolute right-0 w-[48%] h-full">
                <div className="animate-scroll-down">
                  <div className="flex flex-col gap-4">
                    {[...images].reverse().map((image, index) => (
                      <div key={index} className="relative group aspect-[3/4] overflow-hidden rounded-xl shadow-lg">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gallery - Mobile Version */}
          <div className="w-full lg:hidden">
            <div className="relative">
              {/* Navigation Arrows */}
              <button onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10
                  bg-white/90 rounded-full p-2 shadow-lg text-primary hover:bg-white
                  transition-all duration-300">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10
                  bg-white/90 rounded-full p-2 shadow-lg text-primary hover:bg-white
                  transition-all duration-300">
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Scroll Container */}
              <div className="overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory">
                <div className="flex">
                  {images.map((image, index) => (
                    <div key={index} 
                      className={`flex-none w-full transition-opacity duration-300
                        ${currentIndex === index ? 'opacity-100' : 'opacity-0 hidden'}`}>
                      <div className="relative aspect-[3/4] rounded-xl overflow-hidden mx-auto max-w-sm">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent
                          p-4 text-white text-center">
                          <p className="text-lg font-medium">{image.caption}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center space-x-2 mt-4">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 
                      ${currentIndex === index 
                        ? 'bg-white w-6' 
                        : 'bg-white/50 hover:bg-white/75'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-8 text-center lg:text-left">
          <button
            onClick={handleBookClick}
            className="group relative inline-flex items-center justify-center bg-white text-primary 
              font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <span className="relative z-10">Get the Book</span>
            <ChevronRight className="relative z-10 w-5 h-5 ml-2 transition-transform duration-300 
              group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default NextChapterSection;