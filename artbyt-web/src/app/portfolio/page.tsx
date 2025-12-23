import PortfolioGallery from "./portfolio-gallery";
import { getPortfolioSettings } from "@/lib/api";

type PortfolioImage = {
  url: string;
  title: string;
  assignment?: string;
  assignmentTitle?: string;
  size: "small" | "medium" | "large";
};

export default function PortfolioPage() {
  const portfolioData = getPortfolioSettings();
  const images: PortfolioImage[] = portfolioData.images || [];

  return <PortfolioGallery images={images} />;
}
