"use client";

import { useEffect } from "react";
import { ErrorMessage } from "@/app/_components/ui/error-message";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="py-24">
      <ErrorMessage
        title="Kunde inte ladda projektet"
        message="Det gick inte att ladda detta projekt. F├╢rs├╢k igen eller g├Ñ tillbaka till projektlistan."
      />
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={reset}
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700"
        >
          F├╢rs├╢k igen
        </button>
        <a
          href="/assignments"
          className="rounded-md bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200"
        >
          Alla projekt
        </a>
      </div>
    </div>
  );
}
