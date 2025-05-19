"use client";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import { Autoplay, EffectCreative, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import "./Slider.css";

interface Slide {
  id: number;
  order: number;
  image: {
    url: string;
    formats: {
      thumbnail: {
        url: string;
      };
    };
  };
}

interface SliderData {
  data: {
    leftContent: string;
    rightContent: string;
    slides: Slide[];
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

const Slider = () => {
  const [swiperReady, setSwiperReady] = useState(false);
  const [sliderData, setSliderData] = useState<SliderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSliderData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/slider`);
        const data = await response.json();
        setSliderData(data);
      } catch (error) {
        console.error('Error fetching slider data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSliderData();
    setSwiperReady(true);
  }, []);

  if (loading || !sliderData) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
          </div>
        </div>
      </div>
    );
  }

  const { leftContent, rightContent, slides } = sliderData.data;
  const sortedSlides = [...slides].sort((a, b) => a.order - b.order);

  return (
    <motion.div 
      className="flex flex-col lg:flex-row items-center justify-center gap-8 px-4 lg:px-0 max-w-[1440px] mx-auto"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {/* Left text */}
      <motion.div 
        className="flex-1 max-w-[380px] text-lg mb-6 lg:mb-0 text-center lg:text-right"
        variants={item}
      >
        {leftContent}
      </motion.div>
      {/* Slider */}
      <motion.div 
        className="w-full max-w-[420px] flex flex-col items-center overflow-hidden mb-6 lg:mb-0 mx-auto"
        variants={item}
      >
        {swiperReady && (
          <Swiper
            grabCursor={true}
            effect={"creative"}
            creativeEffect={{
              prev: {
                shadow: true,
                translate: ["-20%", 0, -1],
              },
              next: {
                translate: ["100%", 0, 0],
              },
            }}
            modules={[Autoplay, EffectCreative, Pagination]}
            className="mySwiper3"
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            pagination={{
              el: ".custom-pagination",
              clickable: true,
              renderBullet: (index, className) => {
                const thumbUrl = sortedSlides[index].image.formats.thumbnail.url;
                return `<img src="${thumbUrl}" class="${className} custom-bullet" />`;
              },
            }}
          >
            {sortedSlides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="relative w-full aspect-[4/5] bg-[#f5f5f5] flex items-center justify-center rounded-lg overflow-hidden">
                  <motion.img
                    src={slide.image.url}
                    alt={`Slide ${slide.id}`}
                    className="object-cover w-full h-full"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        <motion.div 
          className="mt-4 custom-pagination-container"
          variants={item}
        >
          <div className="custom-pagination"></div>
        </motion.div>
      </motion.div>
      {/* Right text */}
      <motion.div 
        className="flex-1 max-w-[380px] text-lg mt-6 lg:mt-0 text-center lg:text-left"
        variants={item}
      >
        {rightContent}
      </motion.div>
    </motion.div>
  );
};

export default Slider;
