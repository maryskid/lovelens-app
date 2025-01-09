import Image from "next/image";
import { guthenBloots, recoleta } from "@/fonts/typo";

function ScienceSection() {
  return (
    <div className="relative bg-white py-16 px-6 md:px-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Image Section */}
        <div className="relative">
          {/* Main Image */}
          <Image
            src="/couple-playing-golf.png"
            alt="A couple playing golf together"
            width={500}
            height={700}
            className="rounded-lg"
          />

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

        {/* Text Section */}
        <div className="relative text-center md:text-left">
          {/* Emoji and Curved Arrows */}
          <div className="relative flex items-center justify-center md:justify-start mb-4">
            {/* Emoji Image */}
            <Image
              src="/emojis.png"
              alt="Two emojis representing science"
              width={28}
              height={28}
              className="inline-block mr-4"
            />
            {/* Curved Arrows */}
            <div className="relative">
              <Image
                src="/curvy-arrow-up.png"
                alt="Curvy arrow pointing up"
                width={40}
                height={40}
                className="absolute top-[-30px] right-[-10px] md:top-[-40px] md:right-[-20px] rotate-[180deg]"
              />
              <Image
                src="/curvy-arrow-down.png"
                alt="Curvy arrow pointing down"
                width={40}
                height={40}
                className="absolute bottom-[-30px] left-[10px] md:bottom-[-40px] md:left-[20px] rotate-[-150deg]"
              />
            </div>
          </div>

          {/* Text Content */}
          <p
            className={`${guthenBloots.className} text-lg md:text-xl lg:text-2xl mb-4 antialiased`}
          >
            Science-backed tools for deeper understanding
          </p>
          <h2
            className={`${recoleta.className} text-2xl lg:text-3xl font-bold mb-6`}
          >
            Backed by Science
          </h2>
          <p className="text-gray-600 text-sm md:text-base lg:text-lg mb-4">
            Developed with relationship therapists and psychologists, our
            assessment uses proven frameworks for understanding relationship
            dynamics and attachment styles.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ScienceSection;
