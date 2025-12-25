type Props = {
  message?: string;
  title?: string;
};

export function ErrorMessage({
  message = "Något gick fel. Försök igen senare.",
  title = "Ett fel uppstod",
}: Props) {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="rounded-lg bg-red-50 p-8 text-center max-w-md">
        <h3 className="text-lg font-semibold text-red-900 mb-2">{title}</h3>
        <p className="text-sm text-red-700">{message}</p>
      </div>
    </div>
  );
}
