export interface Perfume {
  id: string;
  name: string;
  collectionId: string;
  collectionName: string;
  tagline: string;
  description: string;
  price: number; // in EUR
  sizes: string[];
  image: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  intensity: number; // 1 to 5
  character: string;
  volumeLabel?: string;
  rating?: number;
}

export interface CollectionItem {
  id: string;
  name: string;
  fullName: string;
  description: string;
  image: string;
  subtext: string;
}

export interface CartItem {
  perfume: Perfume;
  quantity: number;
  selectedSize: string;
}

export interface StoryMilestone {
  year: string;
  title: string;
  description: string;
  location: string;
  image: string;
}
