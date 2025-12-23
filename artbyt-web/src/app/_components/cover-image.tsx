import cn from "classnames";
import Link from "next/link";
import Image from "next/image";

type Props = {
  title: string;
  src: string | null;
  slug?: string;
};

const CoverImage = ({ title, src, slug }: Props) => {
  // Return placeholder if no image
  if (!src) {
    return (
      <div className="bg-neutral-200 w-full h-[630px] flex items-center justify-center">
        <span className="text-neutral-400">No image</span>
      </div>
    );
  }

  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn("shadow-sm w-full", {
        "hover:shadow-lg transition-shadow duration-200": slug,
      })}
      width={1300}
      height={630}
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
