import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const TestimonialsCarousel = ({TestimonialRef}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const testimonials = [
    {
      id: 1,
      rating: 5,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.",
      name: "Emily Johnson",
      position: "Software Engineer",
      company: "TechCorp",
      avatar: "EJ"
    },
    {
      id: 2,
      rating: 5,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.",
      name: "Name Surname",
      position: "Position",
      company: "Company name",
      avatar: "NS"
    },
    {
      id: 3,
      rating: 5,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.",
      name: "Name Surname",
      position: "Position",
      company: "Company name",
      avatar: "NS"
    },
    {
      id: 4,
      rating: 5,
      text: "Another amazing testimonial that showcases our excellent service and customer satisfaction. We truly value every client's feedback.",
      name: "Alex Chen",
      position: "Product Manager",
      company: "InnovateCo",
      avatar: "AC"
    },
    {
      id: 5,
      rating: 5,
      text: "Outstanding experience from start to finish. The team exceeded our expectations and delivered exceptional results that transformed our business.",
      name: "Sarah Williams",
      position: "CEO",
      company: "StartupHub",
      avatar: "SW"
    }
  ];

  // Auto-advance testimonials
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isHovered, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div ref={TestimonialRef} className="bg-base-100 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-base-content mb-4">
            Customer testimonials
          </h2>
          <p className="text-lg text-base-content/70">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Carousel */}
          <div className="overflow-hidden rounded-lg">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="card bg-base-200 shadow-lg hover:shadow-xl transition-all duration-300 p-8 mx-auto max-w-4xl border border-base-300  transform hover:scale-101">
                    {/* Stars */}
                    <div className="flex justify-center mb-6">
                      {renderStars(testimonial.rating)}
                    </div>
                    
                    {/* Testimonial Text */}
                    <p className="text-base-content text-lg leading-relaxed mb-8 text-center italic">
                      "{testimonial.text}"
                    </p>
                    
                    {/* Author Info */}
                    <div className="flex items-center justify-center">
                      <div className="avatar w-12 h-12 bg-[#1FB854]/10 rounded-full flex items-center justify-center mr-4 hover:bg-[#1FB854]/20 transition-colors duration-200">
                        <span className="text-[#1FB854] font-semibold text-sm">
                          {testimonial.avatar}
                        </span>
                      </div>
                      <div className="text-center">
                        <h4 className="font-semibold text-base-content text-lg">
                          {testimonial.name}
                        </h4>
                        <p className="text-base-content/60 text-sm">
                          {testimonial.position}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="btn btn-circle btn-ghost absolute left-4 top-1/2 transform -translate-y-1/2 bg-base-200 hover:bg-base-300 shadow-lg hover:shadow-xl transition-all duration-200 z-10 group"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-base-content group-hover:text-[#1FB854]" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="btn btn-circle btn-ghost absolute right-4 top-1/2 transform -translate-y-1/2 bg-base-200 hover:bg-base-300 shadow-lg hover:shadow-xl transition-all duration-200 z-10 group"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-base-content group-hover:text-[#1FB854]" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-[#1FB854] transform scale-125' 
                  : 'bg-base-300 hover:bg-[#1FB854]/50'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

       
        

      <style jsx>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
    </div>
  );
};

export default TestimonialsCarousel;