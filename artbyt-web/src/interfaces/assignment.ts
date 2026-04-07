export interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  company?: string;
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
  draft?: boolean;
  images?: Array<{ url: string }>;
  coverImagePosition?: string;
  coverImageFit?: "cover" | "contain";
  testimonial?: Testimonial;
}
