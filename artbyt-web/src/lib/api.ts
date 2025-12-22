import { Assignment } from "@/interfaces/assignment";
import { Image } from "@/interfaces/image";
import { AssignmentTable } from "@/app/database/tables/assignment.table";
import { ImageTable } from "@/app/database/tables/image.table";
import { Post } from "@/interfaces/post";
import { createKysely } from "@vercel/postgres-kysely";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import { jsonArrayFrom } from 'kysely/helpers/postgres'

const postsDirectory = join(process.cwd(), "_posts");

interface Database {
  assignments: AssignmentTable;
  images: ImageTable
}

interface FlattenedAssignment {
  image_id: number | null;
  id: number;
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

export async function getAllAssignments(limit?: number): Promise<Assignment[]> {

  
    if(limit !== undefined && limit > 0){
        const assignements = await db.selectFrom('assignments')
        .limit(limit)
        .select((eb) => [
          'assignments.id',
          'assignments.created_at as createdAt',
          'assignments.title',
          'assignments.description',
            jsonArrayFrom(
              eb.selectFrom('images')
                .select(['images.id', 'images.url', 'images.filename as fileName'])
                .whereRef('images.assignment_id', '=', 'assignments.id')).as('images')
            ])
            .execute() as Assignment[];

        return assignements;
    }
    else{
        const assignements = await db.selectFrom('assignments')
        .select((eb) => [
          'assignments.id',
          'assignments.created_at as createdAt',
          'assignments.title',
          'assignments.description',
            jsonArrayFrom(
              eb.selectFrom('images')
                .select(['images.id', 'images.url', 'images.filename as fileName'])
                .whereRef('images.assignment_id', '=', 'assignments.id')).as('images')
            ]).execute() as Assignment[];

        return assignements;
    }

}

export async function getAssignmentById(id: number): Promise<Assignment> {
  const assignment = await db.selectFrom('assignments')
    .where('id', '=', id)
    .select((eb) => [
      'assignments.id',
      'assignments.created_at as createdAt',
      'assignments.title',
      'assignments.description',
      jsonArrayFrom(
        eb.selectFrom('images')
          .select(['images.id', 'images.url', 'images.filename as fileName'])
          .whereRef('images.assignment_id', '=', 'assignments.id')).as('images')
    ]).execute() as Assignment[];

    const as = assignment[0];
    console.log(as);
  return as;
}

export async function GetAllImages(): Promise<Image[]> {
  const images = await db.selectFrom('images').select(['id', 'url', 'filename as fileName']).execute() as Image[];
  console.log(images);
  return images;
}
