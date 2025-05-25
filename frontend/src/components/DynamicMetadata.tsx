import { Metadata } from "next";
import { contactService } from "@/services/contactService";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const contactInfo = await contactService.getContactInfo();
    const shopName = contactInfo.shopName;

    return {
      metadataBase: new URL('https://sunflower-parisian.cloud'),
      title: `${shopName} - Shop hoa tươi đẹp tại Quảng Nam`,
      description: `${shopName} chuyên cung cấp hoa tươi, bó hoa đẹp, hoa chúc mừng tại Quảng Nam. Với hơn 10 năm kinh nghiệm trong ngành hoa tươi.`,
      keywords: "hoa tươi, bó hoa, hoa chúc mừng, tiệm hoa Quảng Nam, hoa tươi đẹp",
      authors: [{ name: shopName }],
      openGraph: {
        title: `${shopName} - Shop hoa tươi đẹp tại Quảng Nam`,
        description: `${shopName} chuyên cung cấp hoa tươi, bó hoa đẹp, hoa chúc mừng tại Quảng Nam`,
        type: "website",
        locale: "vi_VN",
        siteName: shopName,
      },
      icons: {
        icon: '/images/favicon.ico',
        apple: '/images/favicon.ico',
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
        },
      },
      viewport: {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 1,
      },
    };
  } catch (error) {
    // Fallback metadata if contact info cannot be fetched
    return {
      metadataBase: new URL('https://sunflower-parisian.cloud'),
      title: "Shop hoa tươi đẹp tại Quảng Nam",
      description: "Chuyên cung cấp hoa tươi, bó hoa đẹp, hoa chúc mừng tại Quảng Nam. Với hơn 10 năm kinh nghiệm trong ngành hoa tươi.",
      keywords: "hoa tươi, bó hoa, hoa chúc mừng, tiệm hoa Quảng Nam, hoa tươi đẹp",
      openGraph: {
        title: "Shop hoa tươi đẹp tại Quảng Nam",
        description: "Chuyên cung cấp hoa tươi, bó hoa đẹp, hoa chúc mừng tại Quảng Nam",
        type: "website",
        locale: "vi_VN",
      },
      icons: {
        icon: '/images/favicon.ico',
        apple: '/images/favicon.ico',
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
        },
      },
      viewport: {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 1,
      },
    };
  }
} 