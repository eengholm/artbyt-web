import { Image } from "./image";

export interface Assignment {
    id: number
    createdAt: Date
    title: string | null
    description: string | null
    images: Image[]
  }