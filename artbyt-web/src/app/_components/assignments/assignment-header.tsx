import Image from "next/image";

type Props = {
  title: string;
  coverImage: string;
  objectPosition?: string;
};

export function AssignmentHeader({
  title,
  coverImage,
  objectPosition = "center",
}: Props) {
  return (
    <div className="mb-8 md:mb-16">
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
        {title}
      </h1>
      {coverImage && (
        <div className="mb-8 md:mb-16 relative w-full aspect-[16/9]">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="rounded-lg object-cover"
            style={{ objectPosition }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            priority
            quality={90}
          />
        </div>
      )}
    </div>
  );
}
