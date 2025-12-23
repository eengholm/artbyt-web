import cn from "classnames";
import Link from "next/link";
import Image from "next/image";

type Props = {
  title: string;
  src: string | null;
  slug?: string;
  objectPosition?: string;
};

const CoverImage = ({ title, src, slug, objectPosition = "center" }: Props) => {
  // Return placeholder if no image
  if (!src) {
    return (
      <div className="bg-neutral-200 w-full aspect-[2/1] flex items-center justify-center rounded-lg">
        <span className="text-neutral-400">No image</span>
      </div>
    );
  }

  const image = (
    <div className="relative w-full aspect-[2/1] overflow-hidden rounded-lg">
      <Image
        src={src}
        alt={`Cover Image for ${title}`}
        fill
        className={cn("object-cover shadow-sm", {
          "hover:shadow-lg transition-shadow duration-200": slug,
        })}
        style={{ objectPosition }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1300px"
      />
    </div>
  );
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/assignments/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;
