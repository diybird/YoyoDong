
export type ModelCategory = 'Image' | 'Video' | 'Audio' | 'Multimodal';

export interface ModelData {
  id: string;
  name: string;
  developer: string;
  releaseDate: string;
  category: ModelCategory;
  price: string;
  apiPrice?: string;
  description: string;
  features: string[];
  badge?: string;
  tags: string[];
  link?: string;
}

export interface FilterState {
  category: ModelCategory | 'All';
  searchTerm: string;
  sort: 'newest' | 'name' | 'price-low' | 'price-high';
}
