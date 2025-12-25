"use client";

import { useEffect } from "react";
import { ErrorMessage } from "@/app/_components/error-message";

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
        title="Något gick fel"
        message="Ett oväntat fel uppstod. Vänligen försök igen."
      />
      <div className="flex justify-center mt-6">
        <button
          onClick={reset}
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700"
        >
          Försök igen
        </button>
      </div>
    </div>
  );
}
