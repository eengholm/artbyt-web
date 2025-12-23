export interface Image {
  id: number;
  url: string | null;
  fileName: string | null;
}

export interface Author {
  name: string;
  picture: string;
}

export interface Assignment {
  id: number;
  slug: string;
  createdAt: Date;
  title: string | null;
  description: string | null;
  excerpt?: string;
  content: string;
  coverImage: string | null;
  coverImagePosition?: string;
  images: Image[];
  author?: Author;
}
