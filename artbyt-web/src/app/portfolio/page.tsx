import { getAllAssignments } from "@/lib/api";
import Image from "next/image";

export default function Portfolio() {
  const assignments = getAllAssignments();
  const allImages = assignments.flatMap((a) => a.images);

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {allImages.map((image) => (
          <article
            key={image.id}
            className="flex max-w-xl flex-col items-start justify-between"
          >
            <div className="rounded-lg overflow-hidden">
              <Image
                width={400}
                height={300}
                className="w-max h-auto"
                sizes="(max-width: 300px) 100vw, (max-width: 400px) 50vw, 33vw"
                src={image.url!}
                alt={image.fileName!}
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
