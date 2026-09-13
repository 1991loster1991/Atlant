export interface Locality {
  id: number;
  name: string;
  slug: string;
  skin_image_url: string;
  latitude_center: number;
  longitude_center: number;
}

export interface Category {
  id: number;
  name: string;
  icon_url: string;
}

export interface Place {
  id: number;
  locality_id: number;
  category_id: number;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  is_premium: boolean;
  is_free: boolean;
  opening_hours: string;
  image_url?: string;
}

export interface Promotion {
  id: number;
  place_id: number;
  discount_text: string;
  expires_at: string;
}