import CoverImage from "@/app/_components/cover-image";
import Link from "next/link";

type Props = {
  title: string;
  coverImage: string;
  excerpt: string;
  slug: string;
};

export function FeaturedAssignment({
  title,
  coverImage,
  excerpt,
  slug,
}: Props) {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage title={title} src={coverImage} slug={slug} />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-5xl leading-tight">{title}</h3>
        </div>
      </div>
    </section>
  );
}
