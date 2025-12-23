import { Assignment } from "@/interfaces/assignment";
import { Post } from "@/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const assignmentsDirectory = join(process.cwd(), "_assignments");
const contentDirectory = join(process.cwd(), "_content");

// General settings
export function getGeneralSettings() {
  const fullPath = join(contentDirectory, "settings", "general.md");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);
  return data;
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

// Assignment functions (handles both posts and assignments)
export function getAssignmentSlugs() {
  return fs.readdirSync(assignmentsDirectory);
}

export function getAssignmentBySlug(slug: string): Assignment {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(assignmentsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // Extract ID from slug (last part after final dash, or use hash of slug)
  const id =
    parseInt(realSlug.split("-").pop() || "0") || Math.abs(hashCode(realSlug));

  return {
    id,
    slug: realSlug,
    createdAt: new Date(data.date),
    title: data.title,
    description: content,
    excerpt: data.excerpt,
    content,
    coverImage: data.coverImage,
    images: (data.images || []).map((img: string, idx: number) => ({
      id: idx,
      url: img,
      fileName: img.split("/").pop(),
    })),
    author: data.author,
  };
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash;
}

export function getAllAssignments(limit?: number): Assignment[] {
  const slugs = getAssignmentSlugs();
  const assignments = slugs
    .map((slug) => getAssignmentBySlug(slug))
    .sort((a1, a2) => (a1.createdAt > a2.createdAt ? -1 : 1));

  if (limit !== undefined && limit > 0) {
    return assignments.slice(0, limit);
  }

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
