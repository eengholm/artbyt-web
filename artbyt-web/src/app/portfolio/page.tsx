"use client";

type PortfolioImage = {
  url: string;
  title: string;
  assignment?: string;
  assignmentTitle?: string;
  size: "small" | "medium" | "large";
};

type PortfolioGalleryProps = {
  images?: PortfolioImage[];
};

export default function PortfolioGallery({
  images = [],
}: PortfolioGalleryProps) {
  if (!images || images.length === 0) {
    return (
      <div className="portfolio-gallery pt-24 px-4">No images to display</div>
    );
  }

  return (
    <div className="portfolio-gallery pt-24 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className={`portfolio-item ${image.size}`}>
            <img src={image.url} alt={image.title} className="w-full h-auto" />
            <h3>{image.title}</h3>
            {image.assignmentTitle && <p>{image.assignmentTitle}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
