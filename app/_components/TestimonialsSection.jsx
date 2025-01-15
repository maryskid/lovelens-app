"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect, useState } from "react";
import { guthenBloots, recoleta } from "@/fonts/typo";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1.2,
      spacing: 16,
    },
    mode: "free-snap",
    breakpoints: {
      "(min-width: 640px)": {
        slides: {
          perView: 2.2,
          spacing: 24,
        },
      },
      "(min-width: 1024px)": {
        slides: {
          perView: 3.2,
          spacing: 32,
        },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
      console.log("Slide changed to:", slider.track.details.rel);
    },
    created() {
      console.log("KeenSlider instance created:", instanceRef.current);
      setLoaded(true);
    },
  });

  useEffect(() => {
    if (!loaded || !instanceRef.current) {
      console.log("Slider not ready yet.");
      return;
    }

    const interval = setInterval(() => {
      console.log("Moving to next slide");
      instanceRef.current?.next();
    }, 6000);

    return () => clearInterval(interval);
  }, [loaded, instanceRef]);

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
    <div className="bg-[#F8F4F2] py-20 px-6 md:px-12 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl -ml-36 -mb-36"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <p className={`${guthenBloots.className} text-xl lg:text-2xl text-primary/80 mb-3`}>
            Real couples who strengthened their bond
          </p>
          <h2 className={`${recoleta.className} text-3xl md:text-4xl font-bold text-gray-800`}>
            Stories of Connection
          </h2>
        </div>

        {/* Slider Navigation */}
        {loaded && instanceRef.current && (
          <div className="hidden md:flex justify-end mb-6 space-x-2 max-w-7xl mx-auto px-4">
            <button
              onClick={() => instanceRef.current?.prev()}
              className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow
                text-gray-600 hover:text-primary"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => instanceRef.current?.next()}
              className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow
                text-gray-600 hover:text-primary"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Slider */}
        <div ref={sliderRef} className="keen-slider">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="keen-slider__slide">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow
                border border-gray-100 h-full flex flex-col group">
                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-primary/20 mb-6 transform group-hover:scale-110 transition-transform" />
                
                {/* Content */}
                <div className="flex flex-col h-full">
                  {/* Image and Details */}
                  <div className="flex items-center space-x-4 mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover ring-4 ring-gray-50"
                    />
                    <div>
                      <h3 className="font-bold text-gray-800">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500">{testimonial.years}</p>
                    </div>
                  </div>

                  {/* Message */}
                  <p className="text-gray-600 leading-relaxed flex-grow">
                    "{testimonial.message}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 
                ${currentSlide === idx 
                  ? "bg-primary w-6" 
                  : "bg-gray-300 hover:bg-gray-400"}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
