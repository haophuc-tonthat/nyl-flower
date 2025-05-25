import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/product';

interface ProductListProps {
  products: Product[];
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);
};

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="min-h-[calc(100vh-6rem)] flex flex-col justify-start pt-8">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-light tracking-wider text-[#0e0e0d]/90 mb-8">Sản phẩm</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link 
              key={product.id} 
              href={`/product/${product.id}`}
              className="group"
            >
              <div className="relative w-full h-[300px] overflow-hidden rounded-xl shadow-md">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-4">
                <h2 className="text-xl font-light tracking-wider text-[#0e0e0d]/90 mb-2">
                  {product.name}
                </h2>
                <p className="text-lg font-light text-[#e593cd] tracking-wider">
                  {formatPrice(product.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList; 