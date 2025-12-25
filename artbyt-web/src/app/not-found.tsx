import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center py-24">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-700">
          Sidan hittades inte
        </h2>
        <p className="mt-2 text-gray-600">
          Sidan du letar efter verkar inte existera.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-md bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-700"
        >
          Tillbaka till startsidan
        </Link>
      </div>
    </div>
  );
}
