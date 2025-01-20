import Image from "next/image";
import { guthenBloots, recoleta } from "@/fonts/typo";
import { Brain, ChevronRight } from "lucide-react";

function ScienceSection() {
  return (
    (<div className="relative bg-gradient-to-b from-white to-white/50 py-20 px-6 md:px-12 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -ml-36 -mb-36"></div>
      </div>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center relative">
        {/* Image Section - Kept Exactly the Same */}
        <div className="relative">
          {/* Main Image */}
          <Image
            src="/couple-playing-golf.png"
            alt="A couple playing golf together"
            width={500}
            height={700}
            className="rounded-lg"
            style={{
              maxWidth: "100%"
            }} />

          {/* Overlay Labels */}
          <div className={`${guthenBloots.className} absolute top-[8%] left-[5%] bg-white text-black text-sm px-4 py-2 rounded-lg border-t-2 border-r-8 border-b-8 border-l-2 border-black shadow-lg rotate-[-8deg]`}>
            Better Understanding
          </div>
          <div className={`${guthenBloots.className} absolute top-[10%] right-[15%] lg:right-[30%] bg-white text-black text-sm px-4 py-2 rounded-lg border-t-2 border-r-8 border-b-8 border-l-2 border-black shadow-lg rotate-[5deg]`}>
            Joint Analysis
          </div>
          <div className={`${guthenBloots.className} absolute bottom-[15%] left-[8%] bg-white text-black text-sm px-4 py-2 rounded-lg border-t-2 border-r-8 border-b-8 border-l-2 border-black shadow-lg rotate-[-10deg]`}>
            Deeper Connection
          </div>
          <div className={`${guthenBloots.className} absolute bottom-[12%] right-[8%] lg:right-[30%] bg-white text-black text-sm px-4 py-2 rounded-lg border-t-2 border-r-8 border-b-8 border-l-2 border-black shadow-lg rotate-[3deg]`}>
            Practical Insights
          </div>
        </div>

        {/* Enhanced Text Section */}
        <div className="relative">
          {/* Header with Icon */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative">
              {/* Emoji and Arrows - Kept Original Images */}
              <div className="relative flex items-center">
                <Image
                  src="/emojis.png"
                  alt="Two emojis representing science"
                  width={28}
                  height={28}
                  className="inline-block mr-4"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    width: "auto"
                  
                  }} />
                {/* Curved Arrows */}
                <div className="relative">
                  <Image
                    src="/curvy-arrow-up.png"
                    alt="Curvy arrow pointing up"
                    width={40}
                    height={40}
                    className="absolute top-[-30px] right-[-10px] md:top-[-40px] md:right-[-20px] rotate-[180deg]"
                    style={{
                      maxWidth: "100%",
                      height: "auto"
                    }} />
                  <Image
                    src="/curvy-arrow-down.png"
                    alt="Curvy arrow pointing down"
                    width={40}
                    height={40}
                    className="absolute bottom-[-30px] left-[10px] md:bottom-[-40px] md:left-[20px] rotate-[-150deg]"
                    style={{
                      maxWidth: "100%",
                      height: "auto"
                    }} />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <p className={`${guthenBloots.className} text-xl md:text-2xl text-primary/80`}>
              Science-backed tools for deeper understanding
            </p>
            
            <h2 className={`${recoleta.className} text-3xl md:text-4xl font-bold text-gray-800`}>
              Backed by Science
            </h2>

            <div className="space-y-6">
              <p className="text-gray-600 text-lg leading-relaxed">
                Developed with relationship therapists and psychologists, our
                assessment uses proven frameworks for understanding relationship
                dynamics and attachment styles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>)
  );
}

export default ScienceSection;