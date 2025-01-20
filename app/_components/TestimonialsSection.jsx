import { Quote } from "lucide-react";
import { guthenBloots, recoleta } from "@/fonts/typo";

const TestimonialsSection = () => {
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
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -ml-36 -mb-36"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className={`${guthenBloots.className} text-xl lg:text-2xl text-primary/80 mb-3`}>
            Real couples who strengthened their bond
          </p>
          <h2 className={`${recoleta.className} text-3xl md:text-4xl font-bold text-gray-800`}>
            Stories of Connection
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 
                border border-gray-100 flex flex-col group hover:-translate-y-1"
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-primary/20 mb-6 transform group-hover:scale-110 transition-transform" />
              
              {/* Content */}
              <div className="flex flex-col h-full">
                {/* Message */}
                <p className="text-gray-600 leading-relaxed flex-grow mb-8 text-lg">
                  "{testimonial.message}"
                </p>

                {/* Image and Details */}
                <div className="flex items-center space-x-4">
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;