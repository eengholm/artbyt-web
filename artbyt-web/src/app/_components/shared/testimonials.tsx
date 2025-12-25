"use client";

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
        <div className="mx-auto max-w-xl text-center animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            Vad kunderna säger
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Se vad mina kunder har att säga om samarbetet
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item, index) => (
              <div
                key={index}
                className="group flex flex-col justify-between rounded-2xl bg-gray-50 p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div>
                  {/* Quote icon */}
                  <svg
                    className="w-8 h-8 text-gray-300 mb-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-base leading-relaxed text-gray-700 italic">
                    "{item.testimonial.quote}"
                  </p>
                </div>
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <p className="text-base font-bold text-gray-900">
                    {item.testimonial.author}
                  </p>
                  {item.testimonial.role && (
                    <p className="text-sm text-gray-600 mt-1">
                      {item.testimonial.role}
                      {item.testimonial.company &&
                        `, ${item.testimonial.company}`}
                    </p>
                  )}
                  <a
                    href={`/assignments/${item.assignmentSlug}`}
                    className="mt-3 inline-flex items-center text-sm font-semibold text-gray-900 hover:text-gray-600 transition-colors group/link"
                  >
                    Se projektet
                    <span className="ml-1 transition-transform duration-300 group-hover/link:translate-x-1">
                      →
                    </span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}
