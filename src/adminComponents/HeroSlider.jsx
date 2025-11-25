import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Dot } from 'lucide-react';

const slidesData = [
  {
    id: 1,
    titlePrimary: "A Beautiful Title",
    titleSecondary: "goes here",
    description: "Our dedicated team is here to help you achieve your goals with cutting-edge technology and seamless support. Discover the features that make our platform unique.",
    imageUrl: "https://placehold.co/1000x600/f5f5f5/333333?text=Analytics+Dashboard",
    alt: "Keyboard and pen, representing data entry and analysis.",
    backgroundColor: 'bg-white',
  },
  {
    id: 2,
    titlePrimary: "Boost Your",
    titleSecondary: "Productivity",
    description: "Dive into detailed reports and visualizations that give you a clear, actionable overview of your data performance. Real-time insights are just a click away.",
    imageUrl: "https://placehold.co/1000x600/eceff1/455a64?text=Growth+Metrics",
    alt: "Minimalistic graph representing growth and metrics.",
    backgroundColor: 'bg-gray-50',
  },
  {
    id: 3,
    titlePrimary: "Simple & Intuitive",
    titleSecondary: "Interface",
    description: "The platform is designed for maximum efficiency, allowing you to find what you need quickly and focus on making informed decisions. Start exploring today.",
    imageUrl: "https://placehold.co/1000x600/e0f2f1/004d40?text=System+Optimization",
    alt: "Abstract network nodes representing system optimization.",
    backgroundColor: 'bg-emerald-50',
  },
];

const SlideContent = ({ slide, isActive }) => (
  <div
    className={`
      flex flex-col justify-center p-6 sm:p-12 md:p-20
      transition-all duration-1000 ease-out
      ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      h-full
    `}
  >
    {/* Primary Title */}
    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
      <span className="bg-yellow-100 px-1 py-0.5 rounded-md leading-relaxed">{slide.titlePrimary}</span>
      <br />
      {slide.titleSecondary}
    </h1>

    {/* Description */}
    <p className="mt-6 max-w-lg text-lg text-gray-700">
      "{slide.description}"
    </p>
  </div>
);

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slidesData.length;
  const autoplayInterval = 5000; 

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  }, [totalSlides]);


  useEffect(() => {
    const timer = setInterval(nextSlide, autoplayInterval);
    return () => clearInterval(timer); 
  }, [nextSlide, autoplayInterval]);

  const currentData = slidesData[currentSlide];

  return (
    <div className="p-3  font-sans w-full mx-auto antialiased flex items-center justify-center">
      <div className={`
        relative w-full bg-gray-100  h-96 sm:h-[450px]
        overflow-hidden rounded-xl
        transition-colors duration-500 ease-in-out
        ${currentData.backgroundColor}
      `}>

        <div className="grid grid-cols-1 md:grid-cols-12 h-full">
          <div className="md:col-span-7 relative z-10 h-full">
            <div className="relative h-full">
              {slidesData.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`
                    absolute top-0 left-0 w-full h-full
                    transition-opacity duration-700 ease-in-out
                    ${index === currentSlide ? 'opacity-100 z-20' : 'opacity-0 z-10'}
                  `}
                >
                  <SlideContent slide={slide} isActive={index === currentSlide} />
                </div>
              ))}
            </div>

            {/* Left Navigation Button */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/70 backdrop-blur-sm rounded-full shadow-md text-gray-700 hover:bg-white transition z-30 ring-4 ring-white/50 focus:outline-none focus:ring-blue-500"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>

          <div className="md:col-span-5 relative overflow-hidden h-full hidden md:block">
            <div
              className="flex h-full transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slidesData.map((slide) => (
                <div key={slide.id} className="min-w-full h-full">
                  <img
                    src={slide.imageUrl}
                    alt={slide.alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out scale-105 hover:scale-100"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/1000x600/cccccc/333333?text=Image+Unavailable"; }}
                  />
                </div>
              ))}
            </div>

            {/* Right Navigation Button */}
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/70 backdrop-blur-sm rounded-full shadow-md text-gray-700 hover:bg-white transition z-30 ring-4 ring-white/50 focus:outline-none focus:ring-blue-500"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Indicator Dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-40">
          {slidesData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`
                h-2.5 w-2.5 rounded-full transition-all duration-300
                ${index === currentSlide ? 'bg-orange-500 w-6' : 'bg-gray-400'}
              `}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;