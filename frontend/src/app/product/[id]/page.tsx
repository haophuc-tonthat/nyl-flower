import PageLayout from "@/components/PageLayout/PageLayout";
import ProductDetail from "@/components/ProductDetail/ProductDetail";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// Types
interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  details: string[];
  images: {
    url: string;
    formats?: {
      thumbnail?: {
        url: string;
      };
    };
  }[];
}

// Constants
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper functions
async function fetchProduct(id: string): Promise<Product | null> {
  try {
    const response = await fetch(`${API_URL}/api/products/${id}`, {
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`API Error: ${response.status}`);
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

async function fetchAllProducts(): Promise<{ id: string }[]> {
  try {
    const response = await fetch(`${API_URL}/api/products`, {
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const { data } = await response.json();
    return data.map((product: Product) => ({
      id: product.id.toString()
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Static generation
export const dynamic = 'force-dynamic';
export const revalidate = 60;

export async function generateStaticParams() {
  return fetchAllProducts();
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await fetchProduct(resolvedParams.id);

  if (!product) {
    return {
      title: 'Sản phẩm không tồn tại',
      description: 'Không tìm thấy sản phẩm',
    };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images.map(img => img.url),
    },
  };
}

// Main component
export default async function ProductPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const product = await fetchProduct(resolvedParams.id);

  if (!product) {
    notFound();
  }

  // Transform product data for the component
  const mappedProduct = {
    ...product,
    image: product.images[0]?.formats?.thumbnail?.url || product.images[0]?.url || '',
    images: product.images.map(img => img.url),
  };

  return (
    <PageLayout>
      <ProductDetail product={mappedProduct} />
    </PageLayout>
  );
} 