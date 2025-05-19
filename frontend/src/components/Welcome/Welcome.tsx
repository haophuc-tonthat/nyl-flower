"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: "check" | "clock" | "shield";
}

interface WelcomeData {
  data: {
    title: string;
    description: string;
    features: Feature[];
    image: {
      url: string;
    };
    quote: string;
    quoteAuthor: string;
  };
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const imageAnimation = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

const Welcome = () => {
  const [welcomeData, setWelcomeData] = useState<WelcomeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWelcomeData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/welcome`);
        const data = await response.json();
        setWelcomeData(data);
      } catch (error) {
        console.error('Error fetching welcome data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWelcomeData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (!welcomeData) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <p className="text-gray-600">Failed to load welcome data</p>
      </div>
    );
  }

  const { title, description, features, image, quote, quoteAuthor } = welcomeData.data;

  const getIconPath = (icon: string) => {
    switch (icon) {
      case "check":
        return "M5 13l4 4L19 7";
      case "clock":
        return "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z";
      case "shield":
        return "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z";
      default:
        return "M5 13l4 4L19 7";
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.div className="space-y-6 sm:space-y-8" variants={item}>
          <motion.div className="space-y-3 sm:space-y-4" variants={item}>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0e0e0d]">
              {title}
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              {description}
            </p>
          </motion.div>

          <motion.div className="space-y-4 sm:space-y-6" variants={item}>
            {features.map((feature) => (
              <motion.div key={feature.id} className="flex items-start" variants={item}>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#e593cd] rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={getIconPath(feature.icon)}
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-[#0e0e0d] mb-1">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div 
          className="relative aspect-square rounded-2xl overflow-hidden shadow-xl mt-8 md:mt-0"
          variants={imageAnimation}
        >
          <Image
            src={image.url}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
            <p className="text-base sm:text-lg font-medium">
              "{quote}"
            </p>
            <p className="mt-2 text-sm sm:text-base opacity-90">- {quoteAuthor}</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Welcome; 