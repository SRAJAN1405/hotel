import React, { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";

// No TypeScript interface
const sliderData = [
  {
    id: 1,
    image: "https://img.heroui.chat/image/food?w=1880&h=950&u=21",
    subtitle: "Authentic & Traditional",
    title: ["Experience the Magic", "of Indian Spices"],
    text: "Embark on a culinary journey through the rich flavors of India",
  },
  {
    id: 2,
    image: "https://img.heroui.chat/image/food?w=1880&h=950&u=22",
    subtitle: "Royal Indian Cuisine",
    title: ["Taste of Heritage", "& Tradition"],
    text: "Discover the authentic taste of traditional Indian delicacies",
  },
  {
    id: 3,
    image: "https://img.heroui.chat/image/food?w=1880&h=950&u=23",
    subtitle: "Spices & Aromatics",
    title: ["Where every dish", "tells a story"],
    text: "Experience the perfect blend of aromatic spices and herbs",
  },
];

export const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % sliderData.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? sliderData.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-deep-brown">
      {sliderData.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === activeSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt=""
              className="w-full h-full object-cover transition-transform duration-7000 scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-deep-brown/70" />
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center justify-center text-center px-4">
            <div className="max-w-4xl mx-auto pt-20">
              <div className="space-y-8 animate-fadeIn">
                <div className="flex items-center justify-center gap-4">
                  <div className="h-px w-12 bg-spice-orange"></div>
                  <p className="text-spice-orange text-sm tracking-[0.4em] uppercase font-bold">
                    {slide.subtitle}
                  </p>
                  <div className="h-px w-12 bg-spice-orange"></div>
                </div>

                <h1 className="text-5xl md:text-7xl font-rajdhani text-white leading-tight">
                  {slide.title.map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < slide.title.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </h1>

                <p className="text-lg md:text-xl text-white/90">{slide.text}</p>

                <Button
                  className="mt-8 bg-spice-orange text-white hover:bg-gradient-to-r from-blue-600 to-purple-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg rounded-md"
                  color="warning"
                  variant="solid"
                  size="lg"
                  radius="md"
                >
                  Explore Menu
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center border border-spice-orange text-spice-orange hover:bg-spice-orange hover:text-white transition-colors"
      >
        <Icon icon="lucide:chevron-left" className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center border border-spice-orange text-spice-orange hover:bg-spice-orange hover:text-white transition-colors"
      >
        <Icon icon="lucide:chevron-right" className="w-6 h-6" />
      </button>

      {/* Book Table Button */}
      <button className="absolute bottom-8 right-8 bg-spice-orange text-white w-28 h-28 flex flex-col items-center justify-center p-4 hover:bg-spice-orange-dark transition-colors">
        <Icon icon="lucide:utensils" className="w-8 h-8 mb-2" />
        <span className="text-xs font-bold tracking-wider text-center uppercase">
          Reserve Table
        </span>
      </button>
    </section>
  );
};
