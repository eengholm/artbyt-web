import { Assignment } from "@/interfaces/assignment";
import { Product } from "@/interfaces/product";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import type Stripe from "stripe";
import { unstable_cache } from "next/cache";
import { getStripe } from "@/lib/stripe";

const contentDirectory = join(process.cwd(), "content");
const assignmentsDirectory = join(contentDirectory, "assignments");
const settingsDirectory = join(contentDirectory, "settings");

// Helper function to safely read files
function safeReadFile(path: string, errorContext: string) {
  try {
    if (!fs.existsSync(path)) {
      console.error(`File not found: ${path}`);
      return null;
    }
    return fs.readFileSync(path, "utf8");
  } catch (error) {
    console.error(`Error reading ${errorContext}:`, error);
    return null;
  }
}

// General settings
export function getGeneralSettings() {
  const fullPath = join(settingsDirectory, "general.md");
  const fileContents = safeReadFile(fullPath, "general settings");

  if (!fileContents) {
    return {
      title: "",
      description: "",
      contactEmail: "",
      phoneNumber: "",
      fromEmail: "",
      logo: "",
      siteName: "",
    };
  }

  const { data } = matter(fileContents);

  return {
    title: data.title || "",
    description: data.description || "",
    contactEmail: data.contactEmail || "",
    phoneNumber: data.phoneNumber || "",
    fromEmail: data.fromEmail || "",
    logo: data.logo || "",
    siteName: data.siteName || data.title || "",
  };
}

// Homepage settings
export function getHomepageSettings() {
  const fullPath = join(settingsDirectory, "homepage.md");
  const fileContents = safeReadFile(fullPath, "homepage settings");

  if (!fileContents) {
    return {};
  }

  const { data } = matter(fileContents);
  return data;
}

// Footer settings
export function getFooterSettings() {
  const fullPath = join(settingsDirectory, "footer.md");
  const fileContents = safeReadFile(fullPath, "footer settings");

  if (!fileContents) {
    return {};
  }

  const { data } = matter(fileContents);
  return data;
}

// Portfolio settings
export function getPortfolioSettings() {
  const fullPath = join(settingsDirectory, "portfolio.md");
  const fileContents = safeReadFile(fullPath, "portfolio settings");

  if (!fileContents) {
    return { images: [] };
  }

  const { data } = matter(fileContents);
  return data;
}

// About page settings
export function getAboutSettings() {
  const fullPath = join(settingsDirectory, "about.md");
  const fileContents = safeReadFile(fullPath, "about settings");

  if (!fileContents) {
    return {
      content: "",
      title: "",
      image: "",
      imagePosition: "center",
    };
  }

  const { data, content } = matter(fileContents);
  return {
    content,
    title: data.title,
    image: data.image,
    imagePosition: data.imagePosition || "center",
  };
}

// Assignment functions
export function getAssignmentSlugs() {
  try {
    if (!fs.existsSync(assignmentsDirectory)) {
      console.error("Assignments directory not found");
      return [];
    }
    return fs.readdirSync(assignmentsDirectory);
  } catch (error) {
    console.error("Error reading assignments directory:", error);
    return [];
  }
}

const SAFE_SLUG = /^[a-zA-Z0-9_-]+$/;

export function getAssignmentBySlug(slug: string): Assignment | null {
  try {
    const realSlug = slug.replace(/\.md$/, "");
    if (!SAFE_SLUG.test(realSlug)) return null;
    const fullPath = join(assignmentsDirectory, `${realSlug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug: realSlug,
      title: data.title || "",
      date: data.date || "",
      coverImage: data.coverImage || "",
      excerpt: data.excerpt || "",
      ogImage: {
        url: data.ogImage || data.coverImage || "",
      },
      content,
      id: data.id,
      description: data.description || "",
      draft: data.draft === true,
      images: data.images || [],
      coverImagePosition: data.coverImagePosition || "center",
      coverImageFit: data.coverImageFit || "cover",
      testimonial: data.testimonial || undefined,
    };
  } catch (error) {
    console.error(`Error loading assignment ${slug}:`, error);
    return null;
  }
}

export function getAssignmentsWithTestimonials(): Assignment[] {
  const allAssignments = getAllAssignments();
  return allAssignments.filter((assignment) => assignment.testimonial);
}

export function getAllAssignments(): Assignment[] {
  const slugs = getAssignmentSlugs();
  const assignments = slugs
    .map((slug) => getAssignmentBySlug(slug))
    .filter((assignment): assignment is Assignment => assignment !== null)
    .filter((assignment) => !assignment.draft)
    .sort((a, b) => {
      if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return 0;
    });
  return assignments;
}

export function getAssignmentById(id: number): Assignment | null {
  const allAssignments = getAllAssignments();
  const assignment = allAssignments.find((a) => a.id === id);
  return assignment || null;
}

// Alias for backwards compatibility
export const getAllPosts = getAllAssignments;

// ─── Products (fetched from Stripe) ──────────────────────────────────────────

const fetchStripeProducts = unstable_cache(
  async (): Promise<Product[]> => {
    const stripe = getStripe();
    const { data } = await stripe.products.list({
      active: true,
      expand: ["data.default_price"],
      limit: 100,
    });
    return data
      .filter(
        (p): p is Stripe.Product & { default_price: Stripe.Price } =>
          typeof p.default_price === "object" && p.default_price !== null,
      )
      .map((p) => ({
        slug: p.id,
        title: p.name,
        description: p.description ?? "",
        excerpt: p.description ?? "",
        image: p.images[0] || "",
        price: (p.default_price as Stripe.Price).unit_amount
          ? Math.round((p.default_price as Stripe.Price).unit_amount! / 100)
          : 0,
        stripePriceId: (p.default_price as Stripe.Price).id,
        active: true,
      }));
  },
  ["stripe-products"],
  { revalidate: 3600 },
);

export async function getAllProducts(): Promise<Product[]> {
  return fetchStripeProducts();
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await fetchStripeProducts();
  return products.find((p) => p.slug === slug) ?? null;
}
