import CoverImage from "@/app/_components/media/cover-image";
import Link from "next/link";

type Props = {
  title: string;
  coverImage: string;
  excerpt: string;
  slug: string;
  objectPosition?: string;
};

export function FeaturedAssignment({
  title,
  coverImage,
  excerpt,
  slug,
  objectPosition = "center",
}: Props) {
  return (
    <section className="mb-24 md:mb-32">
      <div className="mb-8 md:mb-12 overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <CoverImage
          title={title}
          src={coverImage}
          slug={slug}
          objectPosition={objectPosition}
        />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-20 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl font-bold leading-tight">
            <Link
              href={`/assignments/${slug}`}
              className="hover:text-gray-600 transition-colors duration-300"
            >
              {title}
            </Link>
          </h3>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-xl leading-relaxed text-gray-600 mb-6">
            {excerpt}
          </p>
          <Link
            href={`/assignments/${slug}`}
            className="inline-flex items-center text-base font-semibold text-gray-900 hover:text-gray-600 transition-colors group"
          >
            Se projektet
            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
