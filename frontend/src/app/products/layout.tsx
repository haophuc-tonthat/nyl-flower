import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Sản phẩm',
  description: 'Danh sách sản phẩm của chúng tôi',
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 