import { Metadata } from "next";
import { contactService } from "@/services/contactService";

export async function generateMetadata(): Promise<Metadata> {
  const contactInfo = await contactService.getContactInfo();
  const shopName = contactInfo.shopName;

  return {
    title: `Sản phẩm | ${shopName}`,
    description: `Danh sách sản phẩm của ${shopName}`,
  };
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 