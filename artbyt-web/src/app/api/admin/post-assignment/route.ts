import { db } from '@/app/database/database';
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';


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

  const assignement = await db
  .insertInto('assignments')
  .values({
    title: title?.valueOf().toString(),
    description: description?.valueOf().toString(),
  })
  .returningAll()
  .executeTakeFirstOrThrow()

  const image = await db
  .insertInto('images')
  .values({
    filename: filename,
    url: blob.url,
    assignment_id: assignement.id,
  })
  .returningAll()
  .executeTakeFirstOrThrow()




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
