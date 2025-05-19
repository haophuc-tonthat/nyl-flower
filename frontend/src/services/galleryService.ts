import { Gallery } from "@/types/gallery";
import api from "@/lib/api";

// Interface cho service
export interface IGalleryService {
  getAllGalleries(): Promise<Gallery[]>;
}

// Service implementation
class GalleryService implements IGalleryService {
  async getAllGalleries(): Promise<Gallery[]> {
    try {
      const response = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/api/galleries`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching galleries:', error);
      return [];
    }
  }
}

// Service instance
export const galleryService = new GalleryService(); 