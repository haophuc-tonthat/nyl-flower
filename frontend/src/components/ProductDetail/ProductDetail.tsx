"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import OrderForm from './OrderForm';
import { motion } from 'framer-motion';

interface ProductDetailProps {
  product: {
    id: number;
    name: string;
    price: string;
    description: string;
    details: string[];
    images: string[];
    image: string;
  };
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showOrderForm, setShowOrderForm] = useState(false);

  const handleOrder = () => {
    setShowOrderForm(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-[calc(100vh-6rem)] flex flex-col justify-start pt-8"
    >
      <div className="max-w-5xl mx-auto px-4">
        <motion.button 
          onClick={() => router.back()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mb-6 text-[#0e0e0d]/70 hover:text-[#e593cd] transition-colors duration-500 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
          Quay lại
        </motion.button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-[300px] md:h-[500px] overflow-hidden rounded-xl shadow-md"
            >
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-full h-[100px] overflow-hidden rounded-lg transition-all duration-300 ${
                    selectedImage === index 
                      ? "ring-2 ring-[#e593cd] scale-105" 
                      : "hover:ring-1 hover:ring-[#e593cd]/50"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 25vw, 12.5vw"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col justify-between"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h1 className="text-3xl font-light tracking-wider text-[#0e0e0d]/90 mb-2">{product.name}</h1>
                <p className="text-xl font-light text-[#e593cd] tracking-wider">
                  {product.price}
                </p>
              </motion.div>
              
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="text-[#0e0e0d]/70 leading-relaxed tracking-wide"
              >
                {product.description}
              </motion.p>

              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="space-y-4"
              >
                <h2 className="text-xl font-light text-[#0e0e0d]/90">Chi tiết sản phẩm</h2>
                <ul className="space-y-2 text-[#0e0e0d]/70">
                  {product.details.map((detail, index) => (
                    <motion.li 
                      key={index} 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 1.2 + index * 0.1 }}
                      className="flex items-start gap-2"
                    >
                      <span className="text-[#e593cd]">•</span>
                      <span>{detail}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              className="space-y-6"
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOrder}
                className="w-full px-6 py-3 bg-[#e593cd] text-[#FDF9F0] rounded-full hover:bg-[#d17db5] transition-all duration-500 tracking-wider font-light text-base mt-8 mb-8 sm:mt-0 sm:mb-0"
              >
                Đặt hàng
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {showOrderForm && (
        <OrderForm 
          product={{
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0]
          }}
          onClose={() => setShowOrderForm(false)} 
        />
      )}
    </motion.div>
  );
};

export default ProductDetail; 