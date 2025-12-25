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
      <div className="aspect-[16/9] bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-400">Ingen bild tillgänglig</span>
      </div>
    );
  }

  const image = (
    <Image
      src={src}
      alt={title}
      width={1200}
      height={675}
      className={cn("w-full rounded-lg object-cover aspect-[16/9]", {
        "hover:opacity-90 transition-opacity duration-200": slug,
      })}
      style={{ objectPosition }}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      priority={false}
      loading="lazy"
    />
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
