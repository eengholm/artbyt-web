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
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
  id?: number;
  description?: string;
  images?: Array<{ url: string }>;
  coverImagePosition?: string;
}
