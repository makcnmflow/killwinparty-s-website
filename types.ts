export enum PageState {
  HOME = 'HOME',
  BIO = 'BIO',
  GALLERY = 'GALLERY',
  ARCADE = 'ARCADE'
}

export interface GameState {
  name: string;
  isActive: boolean;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
}

export interface MemoryCard {
  id: number;
  iconName: string;
  isFlipped: boolean;
  isMatched: boolean;
}
