'use client';

import PageLayout from "@/components/PageLayout/PageLayout";
import ProductList from "@/components/ProductList/ProductList";
import React, { useEffect, useState } from 'react';

type ProductImage = {
  url: string;
  formats?: {
    thumbnail?: {
      url: string;
    };
  };
};

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  details: string[];
  images: string[];
  image: string;
};

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        const mapped: Product[] = data.data.map((product: Record<string, unknown>) => ({
          id: product.id as number,
          name: product.name as string,
          price: Number(product.price),
          description: product.description as string,
          details: product.details as string[],
          image: Array.isArray(product.images) && product.images.length > 0
            ? ((product.images[0] as ProductImage).formats?.thumbnail?.url || (product.images[0] as ProductImage).url)
            : '',
          images: Array.isArray(product.images) ? (product.images as ProductImage[]).map((img) => img.url) : [],
        }));
        setProducts(mapped);
      });
  }, []);

  return (
    <PageLayout>
      <ProductList products={products} />
    </PageLayout>
  );
} 