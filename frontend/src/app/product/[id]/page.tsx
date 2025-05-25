import PageLayout from "@/components/PageLayout/PageLayout";
import ProductDetail from "@/components/ProductDetail/ProductDetail";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { contactService } from "@/services/contactService";

// Types
interface Product {
  id: number;
  name: string;
  price: number;
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
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nyl-flower.com';

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

async function fetchAllProducts() {
  try {
    const response = await fetch(`${API_URL}/api/products`, {
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const { data } = await response.json();
    return data.map((product: Product) => ({
      id: product.id.toString(),
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Static generation
export const revalidate = 60;

export async function generateStaticParams() {
  return fetchAllProducts();
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await fetchProduct(resolvedParams.id);
  const contactInfo = await contactService.getContactInfo();
  const shopName = contactInfo.shopName;

  if (!product) {
    return {
      title: `Sản phẩm không tồn tại | ${shopName}`,
      description: 'Không tìm thấy sản phẩm',
    };
  }

  const productUrl = `${SITE_URL}/product/${product.id}`;
  const mainImage = product.images[0]?.url || '';

  return {
    title: `${product.name} | ${shopName}`,
    description: product.description,
    keywords: ['hoa', 'bó hoa', 'quà tặng', product.name, shopName],
    authors: [{ name: shopName }],
    openGraph: {
      title: product.name,
      description: product.description,
      url: productUrl,
      siteName: shopName,
      images: [
        {
          url: mainImage,
          width: 1200,
          height: 630,
          alt: product.name,
        }
      ],
      locale: 'vi_VN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [mainImage],
    },
    alternates: {
      canonical: productUrl,
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

  // Generate structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images.map(img => img.url),
    sku: product.id.toString(),
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'VND',
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/product/${product.id}`,
    },
  };

  return (
    <PageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ProductDetail product={mappedProduct} />
    </PageLayout>
  );
} 