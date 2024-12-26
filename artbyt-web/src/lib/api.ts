import { Assignment } from "@/assignment/assignment";
import { AssignmentTable } from "@/assignment/assignment.table";
import { ImageTable } from "@/image/image.table";
import { Post } from "@/interfaces/post";
import { createKysely } from "@vercel/postgres-kysely";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");

interface Database {
  assignments: AssignmentTable;
  images: ImageTable
}

interface FlattenedAssignment {
  image_id: string | null;
  id: string;
  user_id: string;
  created_at: Date;
  title: string | null;
  description: string | null;
  filename: string | null;
  url: string | null;
}


const db = createKysely<Database>();

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, slug: realSlug, content } as Post;
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export async function getAllAssignments(): Promise<FlattenedAssignment[]> {
  const assignments = await db
  .selectFrom('assignments')
  .innerJoinLateral('images', 'image_id', 'id')
  .selectAll()
  .execute() as FlattenedAssignment[];

  return assignments;

}
