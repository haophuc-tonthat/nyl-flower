"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

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

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface FeaturesData {
  data: {
    title: string;
    features: Feature[];
  };
}

const Features = () => {
  const [featuresData, setFeaturesData] = useState<FeaturesData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturesData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/feature-section`);
        const data = await response.json();
        setFeaturesData(data);
      } catch (error) {
        console.error('Error fetching features data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturesData();
  }, []);

  if (loading || !featuresData) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
          </div>
        </div>
      </div>
    );
  }

  const { title, features } = featuresData.data;

  const getIconPath = (icon: string) => {
    switch (icon) {
      case "plus":
        return "M12 6v6m0 0v6m0-6h6m-6 0H6";
      case "check":
        return "M5 13l4 4L19 7";
      case "clock":
        return "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z";
      default:
        return "M12 6v6m0 0v6m0-6h6m-6 0H6";
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <motion.h2 
        className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {title}
      </motion.h2>
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {features.map((feature, index) => (
          <motion.div key={index} className="text-center p-4 sm:p-6" variants={item}>
            <motion.div 
              className="w-14 h-14 sm:w-16 sm:h-16 bg-[#e593cd] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <svg
                className="w-7 h-7 sm:w-8 sm:h-8 text-white"
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
            </motion.div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm sm:text-base text-gray-600">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Features; 