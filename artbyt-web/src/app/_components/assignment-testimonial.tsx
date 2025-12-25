import { Testimonial } from "@/interfaces/assignment";

type Props = {
  testimonial: Testimonial;
};

export function AssignmentTestimonial({ testimonial }: Props) {
  return (
    <div className="my-16 border-l-4 border-gray-900 bg-gray-50 p-8 rounded-r-lg">
      <blockquote className="text-xl italic text-gray-700 mb-6">
        "{testimonial.quote}"
      </blockquote>
      <div className="border-t border-gray-200 pt-4">
        <p className="font-semibold text-gray-900">{testimonial.author}</p>
        {testimonial.role && (
          <p className="text-sm text-gray-600 mt-1">
            {testimonial.role}
            {testimonial.company && `, ${testimonial.company}`}
          </p>
        )}
      </div>
    </div>
  );
}
