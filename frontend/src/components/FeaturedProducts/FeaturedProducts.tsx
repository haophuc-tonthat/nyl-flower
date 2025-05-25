"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import Image from "next/image";
import { motion } from "framer-motion";

interface ProductImage {
  url: string;
  formats?: {
    thumbnail?: {
      url: string;
    };
  };
}

interface FeaturedProductsProps {
  products: {
    id: number;
    name: string;
    price: number;
    description: string;
    images: ProductImage[];
  }[];
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);
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

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-light text-[#0e0e0d]/90 mb-3 tracking-wider">Sản Phẩm Nổi Bật</h2>
        <p className="text-[#0e0e0d]/70 max-w-2xl mx-auto tracking-wider">
          Khám phá những bó hoa tươi đẹp nhất được thiết kế bởi các nghệ nhân
        </p>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <motion.div
              className="group relative bg-[#FDF9F0] p-4 lg:p-6 transition-all duration-500 hover:shadow-lg hover:scale-105 rounded-2xl"
              variants={item}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                <Image
                  src={product.images[0]?.url || '/placeholder.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-[#0e0e0d]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4">
                    <p className="text-[#FDF9F0]/90 tracking-wide leading-relaxed line-clamp-2 text-sm lg:text-base">{product.description}</p>
                  </div>
                </motion.div>
              </div>
              
              <div className="p-3 lg:p-5">
                <motion.h3 
                  className="text-base lg:text-lg font-bold text-[#0e0e0d]/90 mb-2 lg:mb-3 group-hover:text-[#e593cd] transition-colors duration-500 tracking-wide"
                  whileHover={{ color: "#e593cd" }}
                >
                  {product.name}
                </motion.h3>
                <div className="flex flex-col items-start gap-1 justify-between lg:flex-row lg:items-center">
                  <p className="text-sm lg:text-base font-medium text-[#e593cd] tracking-wider">{formatPrice(product.price)}</p>
                  <motion.button 
                    className="text-sm lg:text-base text-[#0e0e0d]/70 hover:text-[#e593cd] transition-colors duration-500 tracking-wider"
                    whileHover={{ x: 5 }}
                  >
                    Chi tiết →
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </div>
  );
};

export default FeaturedProducts; 