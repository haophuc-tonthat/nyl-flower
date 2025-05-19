export interface Gallery {
  id: number;
  title: string;
  category: string;
  image: {
    id: number;
    url: string;
    formats: {
      thumbnail: {
        url: string;
      };
    };
  };
} 