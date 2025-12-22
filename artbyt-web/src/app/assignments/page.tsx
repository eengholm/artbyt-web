import { getAllAssignments } from "@/lib/api";
import Image from "next/image";

export default function Assignments() {
  const assignments = getAllAssignments();
  // const assignments = [
  //     {
  //         id: 1,
  //         title: 'Assignment 1',
  //         description: 'Description of assignment 1',
  //         images: [
  //             {
  //             id: 1,
  //             url: 'https://xg0qbi2elgvfgpac.public.blob.vercel-storage.com/fantasy-logo-7H5h9miU8Wx4bnmfkofOZQr7HqQ6rP.jpg',
  //             fileName: 'placeholder.jpg'
  //             }
  //         ]
  //         },
  //         {
  //         id: 2,
  //         title: 'Assignment 2',
  //         description: 'Description of assignment 2',
  //         images: [
  //             {
  //             id: 2,
  //             url: 'https://xg0qbi2elgvfgpac.public.blob.vercel-storage.com/fantasy-logo-7H5h9miU8Wx4bnmfkofOZQr7HqQ6rP.jpg',
  //             fileName: 'placeholder.jpg'
  //             }
  //         ]
  //         },
  //         {
  //         id: 3,
  //         title: 'Assignment 3',
  //         description: 'Description of assignment 3',
  //         images: [
  //             {
  //             id: 3,
  //             url: 'https://xg0qbi2elgvfgpac.public.blob.vercel-storage.com/fantasy-logo-7H5h9miU8Wx4bnmfkofOZQr7HqQ6rP.jpg',
  //             fileName: 'placeholder.jpg'
  //             }
  //         ]
  //     }
  // ]
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 content-center">
          <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
            Uppdrag
          </h2>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {assignments.map((assignment) => (
            <article
              key={assignment.id}
              className="flex max-w-xl flex-col items-start justify-between"
            >
              <div className="rounded-lg overflow-hidden">
                <Image
                  width={400}
                  height={300}
                  className="w-max h-auto"
                  sizes="(max-width: 300px) 100vw, (max-width: 400px) 50vw, 33vw"
                  src={assignment.images[0]?.url!}
                  alt={assignment.images[0]?.fileName!}
                />
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                  <a href={`/assignments/${assignment.id}`}>
                    <span className="absolute inset-0" />
                    {assignment.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">
                  {assignment.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
