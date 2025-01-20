import React from 'react';
import Image from "next/image";
import { guthenBloots, recoleta } from '@/fonts/typo';

const DiscoverSection = () => {
  const features = [
    {
      icon: "/puzzle-piece.png",
      title: "Uncover Hidden Relationship Patterns",
      description: "Discover the hidden patterns behind recurring tensions in your relationship and uncover the keys to deeper understanding and lasting harmony."
    },
    {
      icon: "/heart.png",
      title: "How to Make Your Partner Feel Loved",
      description: "Discover the specific actions that make your partner feel truly loved, valued, and appreciated in ways that matter most to them."
    },
    {
      icon: "/lightbulb.png",
      title: "Unlock Your Partner's Needs",
      description: "Uncover your partner's unspoken needs and expectations. Gain deeper insights into their emotions and priorities, and build a stronger connection."
    },
    {
      icon: "/emojis.png",
      title: "Understand Your Partner's Reactions",
      description: "Understand why you and your partner react differently to the same situations and uncover the emotions driving your responses."
    }
  ];

  return (
    (<section className="bg-[#F8F4F2] py-24 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center relative mb-16">
          <span className={`${guthenBloots.className} text-xl lg:text-2xl text-primary/80 block mb-3`}>
            Take our assessment to uncover
          </span>
          <h2 className={`${recoleta.className} text-3xl md:text-4xl font-bold text-gray-800`}>
            What you'll Discover
          </h2>
        </div>

        {/* Features Grid */}
        <div className="relative">
          {/* Background Design Element */}
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm border border-gray-100"></div>
          
          {/* Content Grid */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`group p-8 relative
                  ${index !== features.length - 1 ? 'border-b md:border-r border-gray-200' : 'border-b md:border-b-0'}
                  ${index === 1 ? 'lg:border-r' : ''}
                  ${index === 2 ? 'md:border-b lg:border-b-0' : ''}
                  hover:bg-gradient-to-b hover:from-white hover:to-transparent transition-all duration-500
                `}
              >
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Content */}
                <div className="relative">
                  {/* Icon with Highlight */}
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-primary/10 blur-xl transform scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      width={42}
                      height={42}
                      className="relative transform group-hover:scale-110 transition-transform duration-500"
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        width: "auto"
            
                      }} />
                  </div>

                  {/* Text Content */}
                  <div className="mt-6 space-y-3">
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>)
  );
};

export default DiscoverSection;