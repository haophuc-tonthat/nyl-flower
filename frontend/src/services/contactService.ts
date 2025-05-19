import { ContactInfo } from '@/types/contact';
import api from '@/lib/api';

class ContactService {
  private static instance: ContactService;
  private contactInfo: ContactInfo | null = null;

  private constructor() {}

  public static getInstance(): ContactService {
    if (!ContactService.instance) {
      ContactService.instance = new ContactService();
    }
    return ContactService.instance;
  }

  public async getContactInfo(): Promise<ContactInfo> {
    if (this.contactInfo) {
      return this.contactInfo;
    }

    try {
      const response = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`);
      
      if (!response.data || !response.data.data) {
        throw new Error('No contact info received');
      }

      const contactInfo: ContactInfo = {
        id: response.data.data.id,
        shopName: response.data.data.shopName,
        phone: response.data.data.phone,
        email: response.data.data.email,
        address: response.data.data.address,
        facebook: response.data.data.facebook,
        instagram: response.data.data.instagram,
        logo: response.data.data.logo
      };

      this.contactInfo = contactInfo;
      return contactInfo;
    } catch (error) {
      throw error;
    }
  }
}

export const contactService = ContactService.getInstance(); 