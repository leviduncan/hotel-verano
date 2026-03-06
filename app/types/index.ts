export interface Room {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  pricePerNight: number;
  bedType: 'King' | 'Twin' | 'Double' | 'Suite';
  capacity: number;
  sizeSqm: number;
  images: {
    src: string;
    alt: string;
    width: number;
    height: number;
    blurDataURL?: string;
  }[];
  amenities: {
    icon: string;
    label: string;
  }[];
  availability: {
    bookedDates: string[];
  };
  badge?: 'Available' | 'Limited' | 'Unavailable';
  featured: boolean;
  order: number;
}
