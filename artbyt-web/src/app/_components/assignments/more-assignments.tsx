"use client";

import { Assignment } from "@/interfaces/assignment";
import Image from "next/image";
import Link from "next/link";

type Props = {
  assignments: Assignment[];
};

export function MoreAssignments({ assignments }: Props) {
  if (!assignments || assignments.length === 0) return null;

  return (
    <section className="mb-24 md:mb-32">
      {/* Section header */}
      <div className="flex items-baseline justify-between mb-10 border-t border-gray-300 pt-8">
        <h2 className="text-xl font-bold text-gray-900">
          Assignments &amp; Experiments
        </h2>
        <span className="text-xs uppercase tracking-widest text-gray-400">
          Lab Notes
        </span>
      </div>

      {/* 4-column small card grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {assignments.map((assignment) => (
          <Link
            key={assignment.slug}
            href={`/assignments/${encodeURIComponent(assignment.slug)}`}
            className="group block"
          >
            {/* Small square image */}
            <div className="aspect-square relative overflow-hidden mb-3">
              {assignment.coverImage ? (
                <Image
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                  src={assignment.coverImage}
                  alt={assignment.title}
                  style={{
                    objectPosition: assignment.coverImagePosition || "center",
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
            </div>

            <h3 className="text-sm font-bold text-gray-900 group-hover:text-gray-600 transition-colors duration-200 mb-1 leading-snug">
              {assignment.title}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
              {assignment.excerpt}
            </p>
            <span className="mt-2 inline-block text-xs uppercase tracking-widest text-gray-400 group-hover:text-gray-900 transition-colors duration-200">
              Read ›
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
