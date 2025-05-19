import PageLayout from "@/components/PageLayout/PageLayout";
import ProductDetail from "@/components/ProductDetail/ProductDetail";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// Tạo các trang tĩnh cho từng sản phẩm
export async function generateStaticParams() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
    
    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`);
      return [];
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('API did not return JSON. Content-Type:', contentType);
      return [];
    }

    const data = await response.json();
    return data.data.map((product: Record<string, any>) => ({
      id: product.id.toString(),
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.id);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`);
  const data = await res.json();
  const product = data.data;

  if (!product) {
    return {
      title: 'Sản phẩm không tồn tại',
      description: 'Không tìm thấy sản phẩm',
    };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.id);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`);
  const data = await res.json();
  const product = data.data;

  if (!product) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center">
          <p className="text-2xl text-[#0e0e0d]">Không tìm thấy sản phẩm</p>
        </div>
      </PageLayout>
    );
  }

  // Map lại dữ liệu cho ProductDetail
  const mappedProduct = {
    ...product,
    image: product.images && product.images.length > 0
      ? (product.images[0].formats?.thumbnail?.url || product.images[0].url)
      : '',
    images: product.images ? product.images.map((img: Record<string, any>) => img.url) : [],
  };

  return (
    <PageLayout>
      <ProductDetail product={mappedProduct} />
    </PageLayout>
  );
} 