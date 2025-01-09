import React from 'react';
import Image from 'next/image';
import { guthenBloots, recoleta } from '@/fonts/typo';

const DiscoverSection = () => {
  return (
    <section className="bg-[#F8F4F2] py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto text-center">
        {/* Stylish introductory text */}
        <div className="mb-6">
          <span className={`${guthenBloots.className} text-xl lg:text-2xl mb-2`}>Take our assessment to uncover</span>
        </div>
        <h2 className={`${recoleta.className} text-2xl md:text-3xl font-bold mb-10`}>
          What you’ll Discover
        </h2>
        {/* Outer container with a white background and dividers */}
        <div className="bg-white p-4 md:p-8 shadow rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            <div className="flex flex-col items-center text-center px-4 py-4">
              <Image src="/puzzle-piece.png" alt="Puzzle piece" width={42} height={42} />
              <h3 className="text-lg font-semibold mt-4">Uncover Hidden Relationship Patterns</h3>
              <p className="mt-2">
                Discover the hidden patterns behind recurring tensions in your relationship and uncover the keys to deeper understanding and lasting harmony.
              </p>
            </div>
            <div className="flex flex-col items-center text-center px-4 py-4">
              <Image src="/heart.png" alt="Heart" width={42} height={42} />
              <h3 className="text-lg font-semibold mt-4">How to Make Your Partner Feel Loved</h3>
              <p className="mt-2">
                Discover the specific actions that make your partner feel truly loved, valued, and appreciated in ways that matter most to them.
              </p>
            </div>
            <div className="flex flex-col items-center text-center px-4 py-4">
              <Image src="/lightbulb.png" alt="Lightbulb" width={42} height={42} />
              <h3 className="text-lg font-semibold mt-4">Unlock Your Partner's Needs</h3>
              <p className="mt-2">
                Uncover your partner's unspoken needs and expectations. Gain deeper insights into their emotions and priorities, and build a stronger connection.
              </p>
            </div>
            <div className="flex flex-col items-center text-center px-4 py-4">
              <Image src="/emojis.png" alt="Smile" width={42} height={42} />
              <h3 className="text-lg font-semibold mt-4">Understand Your Partner's Reactions</h3>
              <p className="mt-2">
                Understand why you and your partner react differently to the same situations and uncover the emotions driving your responses.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverSection;
