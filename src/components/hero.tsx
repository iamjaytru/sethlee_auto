"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { motion } from "framer-motion";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    "/images/hero_image1.jpg",
    "/images/hero_image2.jpg",
    "/images/hero_image3.jpg",
    "/images/hero_image4.jpg",
    "/images/hero_image5.jpg",
    "/images/hero_image6.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative w-full h-[80vh] min-h-[600px] max-h-[900px] bg-gray-900 flex items-center overflow-hidden">
      {/* Background Image Slider */}
      <div className="absolute inset-0 z-0">
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Luxury Car ${index + 1}`}
            fill
            priority={index === 0}
            quality={90}
            className={`object-cover object-center transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          />
        ))}
        <div className="absolute inset-0 bg-black/60 z-10"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="max-w-3xl lg:max-w-4xl xl:max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Find Your <span className="text-primary">Perfect</span> Drive
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 md:mb-10 max-w-2xl "
          >
            Browse our extensive collection of premium vehicles and drive away
            with confidence.
            <span className="block mt-2 text-base sm:text-lg">
              Quality cars, competitive prices, exceptional service.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Button
              className="text-base sm:text-lg md:text-xl px-8 py-6 sm:px-10 sm:py-6 hover:scale-105 transition-transform"
              size="lg"
              asChild
            >
              <Link href="/inventory">Browse Inventory</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base sm:text-lg md:text-xl px-8 py-6 sm:px-10 sm:py-6 bg-transparent text-white border-white hover:bg-white/10 hover:text-white hover:scale-105 transition-transform"
              asChild
            >
              <Link href="/contact?source=hero">Contact Us</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-primary" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white h-8 w-8"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
