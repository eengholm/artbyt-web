import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { createKysely } from "@vercel/postgres-kysely";
import { AssignmentTable } from '@/assignment/assignment.table';
import { ImageTable } from '@/image/image.table';
import { UserTable } from '@/user/user.table';


export interface Database {
  assignments: AssignmentTable;
  images: ImageTable
  users: UserTable;
}


const db = createKysely<Database>();

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  if(!filename){
    throw new Error('Missing filename');
  }

  const formData = await request.formData();
  const file = formData.get('file-upload') as File | null;
  const title = formData.get('title');
  const description = formData.get('description');

  // ⚠️ The below code is for App Router Route Handlers only
  if (!file) {
    throw new Error('Missing file');
  }

  const blob = await put(filename, file, {
    access: 'public',
  });

  const image = await db
  .insertInto('images')
  .values({
    filename: filename,
    url: blob.url
  })
  .returningAll()
  .executeTakeFirstOrThrow()

  console.log('image', image)

  const assignement = await db
  .insertInto('assignments')
  .values({
    title: title?.valueOf().toString(),
    description: description?.valueOf.toString(),
    image_id: image.id,
  })
  .returningAll()
  .executeTakeFirstOrThrow()

  console.log('assignment', assignement)




  // Here's the code for Pages API Routes:
  // const blob = await put(filename, request, {
  //   access: 'public',
  // });

  return NextResponse.json(blob);
}

// The next lines are required for Pages API Routes only
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
