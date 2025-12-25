type Props = {
  variant?: "line" | "dots" | "gradient";
};

export function SectionDivider({ variant = "line" }: Props) {
  if (variant === "dots") {
    return (
      <div className="flex justify-center items-center my-16 md:my-24">
        <div className="flex gap-2">
          <div
            className="w-2 h-2 bg-gray-900 rounded-full animate-pulse"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="w-2 h-2 bg-gray-700 rounded-full animate-pulse"
            style={{ animationDelay: "0.2s" }}
          />
          <div
            className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"
            style={{ animationDelay: "0.4s" }}
          />
        </div>
      </div>
    );
  }

  if (variant === "gradient") {
    return (
      <div className="my-16 md:my-24 flex items-center">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
      </div>
    );
  }

  // Default line variant
  return (
    <div className="my-16 md:my-24 flex items-center gap-4">
      <div className="flex-1 h-px bg-gray-200" />
      <div className="w-12 h-0.5 bg-gray-900" />
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  );
}
