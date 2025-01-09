"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect, useState } from "react";
import { guthenBloots, recoleta } from "@/fonts/typo";

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true, // Enables infinite looping
    slides: {
      perView: 1.5,
      spacing: 10,
    },
    mode: "free-snap", // Allows seamless snapping
    breakpoints: {
      "(min-width: 640px)": {
        slides: {
          perView: 2.5,
          spacing: 20,
        },
      },
      "(min-width: 1024px)": {
        slides: {
          perView: 3.5,
          spacing: 30,
        },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel); // Update the active slide
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next(); // Move to the next slide
    }, 6000); // Transition every 6 seconds
    return () => clearInterval(interval);
  }, [instanceRef]);

  const testimonials = [
    {
      name: "Sarah & James",
      years: "Together 5 years",
      message:
        "This revealed things we'd never discussed in our 5-year marriage. Now we understand each other's reactions so much better.",
      image: "/couple-bg.jpg",
    },
    {
      name: "Emily & Michael",
      years: "Together 3 years",
      message:
        "We discovered new ways to communicate and truly listen to each other. This has been life-changing for us.",
      image: "/couple-bg.jpg",
    },
    {
      name: "Anna & Tom",
      years: "Together 7 years",
      message:
        "We feel more connected than ever. This helped us understand each other's needs on a deeper level.",
      image: "/couple-bg.jpg",
    },
    {
      name: "Lucy & Mark",
      years: "Together 2 years",
      message:
        "This strengthened our bond and helped us grow as a couple. We are so grateful for this experience.",
      image: "/couple-bg.jpg",
    },
  ];

  return (
    <div className="bg-[#F8F4F2] py-16 px-6 md:px-12">
      <div className="text-center mb-8">
        <p className={`${guthenBloots.className} text-xl lg:text-2xl mb-2`}>
          Real couples who strengthened their bond through understanding and connection.
        </p>
        <h2 className={`${recoleta.className} antialiased text-2xl md:text-3xl font-bold mb-4`}>
          Real Couples, Real Results
        </h2>
      </div>
      <div
        ref={sliderRef}
        className="keen-slider container mx-auto px-4 sm:px-6 lg:px-8"
      >
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="keen-slider__slide flex items-stretch"
          >
            <div className="border-r-4 border-b-4 border-primary p-6 rounded-lg bg-white shadow-md max-w-sm mx-auto w-full h-full flex flex-col justify-between">
              {/* Top Rounded Image */}
              <img
                src={testimonial.image}
                alt={`${testimonial.name}`}
                className="w-24 h-24 rounded-full mb-4 object-cover mx-auto"
              />
              {/* Name and Years */}
              <h3 className="text-lg font-bold text-center mb-2">
                {testimonial.name}
              </h3>
              <p className="text-sm text-gray-500 text-center mb-4">
                {testimonial.years}
              </p>
              {/* Message */}
              <p className="text-gray-700 text-center flex-grow">
                {testimonial.message}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentSlide === idx ? "bg-primary" : "bg-gray-300"
            }`}
            onClick={() => instanceRef.current?.moveToIdx(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
