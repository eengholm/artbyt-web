import { Image } from "../image/image";

export interface Assignment {
    id: string
    createdAt: Date
    title: string | null
    description: string | null
    image: Image | null
  }