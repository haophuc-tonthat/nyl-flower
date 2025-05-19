import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryService } from '@/services/galleryService';
import { Gallery } from '@/types/gallery';

const categories = ["Hoa tươi", "Không gian", "Nghệ nhân"] as const;

const GalleryComponent = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>("Hoa tươi");
  const [galleryImages, setGalleryImages] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const galleries = await galleryService.getAllGalleries();
        setGalleryImages(galleries);
      } catch (error) {
        console.error('Error fetching galleries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleries();
  }, []);

  const filteredImages = useMemo(() => 
    galleryImages.filter(img => img.category === activeCategory),
    [galleryImages, activeCategory]
  );

  const selectedImageData = useMemo(() => 
    selectedImage ? galleryImages.find(img => img.id === selectedImage) : null,
    [selectedImage, galleryImages]
  );

  const getImageUrl = (image: Gallery['image']) => {
    if (!image?.url) return '';
    return image.url;
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <section className="py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 sm:mb-3">Thư viện hình ảnh</h2>
        <p className="text-sm sm:text-base text-gray-600 text-center mb-6 sm:mb-8">Khám phá vẻ đẹp của những bó hoa tươi thắm</p>
        
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm transition-all shadow-sm hover:shadow-md ${
                activeCategory === category
                  ? "bg-primary text-pink-500 font-medium shadow-lg border-2 border-pink-500"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <AnimatePresence>
            {filteredImages.map((image, index) => (
              <motion.div 
                key={image.id} 
                className="relative group mb-3 sm:mb-4"
                variants={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onClick={() => setSelectedImage(image.id)}
              >
                <div className="relative overflow-hidden rounded-lg shadow-md aspect-[4/3]">
                  <Image
                    src={getImageUrl(image.image)}
                    alt={image.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority={index < 3}
                    quality={85}
                    loading={index < 3 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-sm sm:text-base font-semibold mb-1">{image.title}</h3>
                      <p className="text-xs sm:text-sm opacity-90">{image.category}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {selectedImageData && (
            <motion.div 
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <motion.div 
                className="relative max-w-3xl w-full"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <div className="relative w-full max-h-[80vh] overflow-hidden rounded-lg">
                  <Image
                    src={getImageUrl(selectedImageData.image)}
                    alt={selectedImageData.title}
                    width={800}
                    height={600}
                    className="w-full h-full object-contain"
                    quality={100}
                    priority
                  />
                </div>
                <button 
                  className="absolute top-2 sm:top-3 right-2 sm:right-3 text-white bg-black/50 rounded-full p-1.5 hover:bg-black/70 transition-colors"
                  onClick={() => setSelectedImage(null)}
                  aria-label="Close gallery"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GalleryComponent; 