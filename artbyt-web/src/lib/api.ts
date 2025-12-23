import { Assignment } from "@/interfaces/assignment";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const assignmentsDirectory = join(process.cwd(), "_assignments");
const contentDirectory = join(process.cwd(), "_content");
const settingsDirectory = join(contentDirectory, "settings");

// General settings
export function getGeneralSettings() {
  const fullPath = join(settingsDirectory, "general.md");
  const fileContents = fs.readFileSync(fullPath, "utf8");
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
  const fullPath = join(contentDirectory, "homepage.md");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);
  return data;
}

// Footer settings
export function getFooterSettings() {
  const fullPath = join(contentDirectory, "footer.md");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);
  return data;
}

// Portfolio settings
export function getPortfolioSettings() {
  const fullPath = join(contentDirectory, "portfolio.md");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);
  return data;
}

// About page settings
export function getAboutSettings() {
  const fullPath = join(contentDirectory, "about.md");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  return {
    content,
    title: data.title, // add your title source here
    image: data.image, // add your image source here
  };
}

// Assignment functions (handles both posts and assignments)
export function getAssignmentSlugs() {
  return fs.readdirSync(assignmentsDirectory);
}

export function getAssignmentBySlug(slug: string): Assignment | null {
  try {
    const realSlug = slug.replace(/\.md$/, "");
    const fullPath = join(assignmentsDirectory, `${realSlug}.md`);

    // Check if file exists
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
      id: data.id, // Add id from frontmatter
      description: data.description || "",
      images: data.images || [],
      coverImagePosition: data.coverImagePosition || "center",
    };
  } catch (error) {
    console.error(`Error loading assignment ${slug}:`, error);
    return null;
  }
}

export function getAllAssignments(): Assignment[] {
  const slugs = getAssignmentSlugs();
  const assignments = slugs
    .map((slug) => getAssignmentBySlug(slug))
    .filter((assignment): assignment is Assignment => assignment !== null)
    .sort((a, b) => {
      if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return 0;
    });
  return assignments;
}

export function getAssignmentById(id: number): Assignment {
  const allAssignments = getAllAssignments();
  const assignment = allAssignments.find((a) => a.id === id);

  if (!assignment) {
    throw new Error(`Assignment with id ${id} not found`);
  }

  return assignment;
}

// Alias for backwards compatibility
export const getAllPosts = getAllAssignments;
