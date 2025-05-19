import { NextResponse } from 'next/server';
import { ContactInfo } from '@/types/contact';

const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET() {
  try {
    const response = await fetch(`${STRAPI_URL}/api/contact?populate=logo`);
    if (!response.ok) {
      throw new Error('Failed to fetch contact info from Strapi');
    }

    const data = await response.json();
    console.log('Strapi response:', data);

    if (!data.data) {
      throw new Error('No contact info received from Strapi');
    }

    // Trả về trực tiếp dữ liệu từ Strapi
    return NextResponse.json(data.data);
  } catch (error) {
    console.error('Error fetching contact info:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contact info' },
      { status: 500 }
    );
  }
} 