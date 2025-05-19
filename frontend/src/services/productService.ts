import { Product } from "@/types/product";
import api from "@/lib/api";

// Interface cho service
export interface IProductService {
  getProductById(id: number): Promise<Product | null>;
  getAllProducts(): Promise<Product[]>;
}

// Service implementation
class ProductService implements IProductService {
  async getProductById(id: number): Promise<Product | null> {
    try {
      const response = await api.get(`/api/products/${id}?populate=images`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      const response = await api.get('/api/products?populate=images');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }
}

// Service instance
export const productService = new ProductService();

// Trong tương lai, bạn có thể tạo một service mới để lấy data từ API:
/*
class ApiProductService implements IProductService {
  async getProductById(id: number): Promise<Product | null> {
    const response = await fetch(`/api/products/${id}`);
    if (!response.ok) return null;
    return response.json();
  }

  async getAllProducts(): Promise<Product[]> {
    const response = await fetch('/api/products');
    if (!response.ok) return [];
    return response.json();
  }
}

// export const productService = new ApiProductService();
*/ 