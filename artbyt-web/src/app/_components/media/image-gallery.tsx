import Image from "next/image";

type Props = {
  images:
    | Array<{ url?: string; alt?: string; imagePosition?: string }>
    | string[];
  title: string;
};

export function ImageGallery({ images, title }: Props) {
  if (!images || images.length === 0) return null;

  const imageArray = images.map((img) =>
    typeof img === "string" ? { url: img } : img
  );

  const getObjectPosition = (position?: string) => {
    if (!position) return "object-center";
    const positionMap: Record<string, string> = {
      top: "object-top",
      bottom: "object-bottom",
      left: "object-left",
      right: "object-right",
      center: "object-center",
      "top left": "object-left-top",
      "top right": "object-right-top",
      "bottom left": "object-left-bottom",
      "bottom right": "object-right-bottom",
    };
    return positionMap[position] || "object-center";
  };

  return (
    <div className="my-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {imageArray.map((image, index) => {
          if (!image.url) return null;

          return (
            <div
              key={index}
              className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100"
            >
              <Image
                src={image.url}
                alt={image.alt || `${title} - Bild ${index + 1}`}
                fill
                className={`object-cover hover:scale-105 transition-transform duration-300 ${getObjectPosition(
                  image.imagePosition
                )}`}
                sizes="(max-width: 768px) 100vw, 50vw"
                loading={index < 2 ? "eager" : "lazy"}
                quality={85}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
