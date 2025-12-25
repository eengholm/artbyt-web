import { Testimonial } from "@/interfaces/assignment";

type Props = {
  testimonials: Array<{
    testimonial: Testimonial;
    assignmentTitle: string;
    assignmentSlug: string;
  }>;
};

export function Testimonials({ testimonials }: Props) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Vad kunderna säger
          </h2>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item, index) => (
              <div
                key={index}
                className="flex flex-col justify-between rounded-2xl bg-gray-50 p-8"
              >
                <div>
                  <p className="text-sm/6 text-gray-600 italic">
                    "{item.testimonial.quote}"
                  </p>
                </div>
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <p className="text-base font-semibold text-gray-900">
                    {item.testimonial.author}
                  </p>
                  {item.testimonial.role && (
                    <p className="text-sm text-gray-600">
                      {item.testimonial.role}
                      {item.testimonial.company &&
                        `, ${item.testimonial.company}`}
                    </p>
                  )}
                  <a
                    href={`/assignments/${item.assignmentSlug}`}
                    className="mt-2 text-sm text-gray-500 hover:text-gray-700"
                  >
                    Projekt: {item.assignmentTitle}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
