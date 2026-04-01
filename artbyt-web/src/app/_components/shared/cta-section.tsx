import Link from "next/link";

type Props = {
  heading?: string;
  subheading?: string;
  buttonText?: string;
  buttonHref?: string;
};

export function CtaSection({
  heading = "Looking for curation?",
  subheading = "I'm currently accepting new projects and gallery collaborations for late 2024.",
  buttonText = "Get in Touch",
  buttonHref = "/about",
}: Props) {
  return (
    <section className="mb-0 py-24 md:py-32 text-center border-t border-gray-300">
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
        {heading}
      </h2>
      <p className="mt-4 text-sm text-gray-500 max-w-xs mx-auto leading-relaxed">
        {subheading}
      </p>
      <div className="mt-8">
        <Link
          href={buttonHref}
          className="inline-block text-xs uppercase tracking-widest text-gray-900 border border-gray-900 px-8 py-3 hover:bg-gray-900 hover:text-white transition-colors duration-200"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}
