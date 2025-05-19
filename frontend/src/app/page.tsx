"use client";

import React, { useEffect, useState } from 'react';
import PageLayout from '@/components/PageLayout/PageLayout';
import Slider from "@/components/Slider/Slider";
import Welcome from "@/components/Welcome/Welcome";
import Features from "@/components/Features/Features";
import FeaturedProducts from '@/components/FeaturedProducts/FeaturedProducts';
import Gallery from '@/components/Gallery/Gallery';
import Contact from '@/components/Contact/Contact';
// import { products } from '@/data/products';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        // Map lại dữ liệu để lấy đúng trường image cho component
        const mapped = data.data.map((product: Record<string, unknown>) => ({
          ...product,
          image: Array.isArray(product.images) && product.images.length > 0
            ? ((product.images[0] as { formats?: { thumbnail?: { url: string } }, url: string }).formats?.thumbnail?.url || (product.images[0] as { url: string }).url)
            : '',
        }));
        setProducts(mapped);
      });
  }, []);

  return (
    <PageLayout>
      <div className="flex-1">
        <div className="pt-4 pb-12">
          <Slider />
        </div>

        <div id="featured" className="py-12">
          <FeaturedProducts products={products} />
        </div>
        
        <div id="about" className="py-20">
          <Welcome />
        </div>

        <div className="py-20">
          <Features />
        </div>

        <div id="gallery" className="py-20">
          <Gallery />
        </div>

        <div id="contact" className="py-20">
          <Contact />
        </div>
      </div>
    </PageLayout>
  );
}
