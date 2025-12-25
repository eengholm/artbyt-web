"use client";

import { Assignment } from "@/interfaces/assignment";
import { AssignmentPreview } from "./assignment-preview";

type Props = {
  assignments: Assignment[];
};

export function MoreAssignments({ assignments }: Props) {
  return (
    <section className="mb-20 md:mb-32">
      <div className="mb-12 animate-fade-in">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
          Fler Projekt
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl">
          Upptäck fler exempel på mitt arbete och kreativa lösningar
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 auto-rows-fr">
        {assignments.map((assignment, index) => (
          <div
            key={assignment.slug}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <AssignmentPreview
              title={assignment.title || ""}
              coverImage={assignment.coverImage || ""}
              slug={assignment.slug}
              excerpt={assignment.excerpt || ""}
              objectPosition={assignment.coverImagePosition}
            />
          </div>
        ))}
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
