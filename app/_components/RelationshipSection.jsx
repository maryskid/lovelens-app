import React from "react";
import Image from "next/image";
import { guthenBloots, recoleta } from "@/fonts/typo";

const RelationshipSection = () => {
  return (
    <section className="w-full max-w-full mx-auto px-6 py-16 overflow-hidden md:px-24">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Text Section */}
        <div className="flex-1 space-y-4 px-4">
          <div className="relative text-center lg:text-left">
            {/* Emoji Above the Heading */}
            <div className="flex justify-center lg:justify-start mb-2">
              <Image
                src="/emojis.png"
                alt="Emoji emphasizing connection"
                width={32}
                height={32}
                className="inline-block"
              />
            </div>

            {/* Heading with Sparkles */}
            <div className="relative">
              <h3
                className={`${guthenBloots.className} text-xl lg:text-2xl mb-2`}
              >
                Bridging Relationship Gaps
              </h3>
              {/* Sparkles Positioned Top-Right */}
              <div className="absolute top-0 -right-10 lg:-right-12 transform translate-y-[-50%]">
                <Image
                  src="/sparkles.png"
                  alt="Sparkles"
                  width={48}
                  height={48}
                />
              </div>
            </div>
          </div>

          {/* Subheading */}
          <h2
            className={`${recoleta.className} text-2xl md:text-3xl font-bold mb-4`}
          >
            Why it Matters
          </h2>

          {/* Description Text */}
          <p className="text-gray-700 text-base lg:text-lg">
            In modern relationships, 70% of conflicts arise from simple
            differences in perception. These small misunderstandings silently
            accumulate, creating unexpected distance between partners.
            Understanding these differences is the first step to a stronger
            connection.
          </p>
        </div>

        {/* Image Section */}
        <div className="flex-1 flex justify-center lg:justify-end items-center">
          <Image
            src="/funny-couple.png"
            alt="Couple showing different emotions"
            width={500} // Set a larger width
            height={500} // Maintain the aspect ratio
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default RelationshipSection;
