import { HomeSlideshow } from "@/app/_components/projects/home-slideshow";
import {
  getGeneralSettings,
  getHomepageSettings,
  getPortfolioSettings,
} from "@/lib/api";

export const revalidate = 3600;

export default function Index() {
  const settings = getGeneralSettings();
  const homepageData = getHomepageSettings();
  const portfolioData = getPortfolioSettings();

  // Use homepage-specific slides when defined, otherwise fall back to portfolio images
  const homepageSlides: { url: string; title?: string }[] =
    homepageData.slides || [];
  const portfolioSlides = (portfolioData.images || [])
    .filter((img: { url?: string }) => img.url)
    .map((img: { url: string; title?: string }) => ({
      url: img.url,
      title: img.title,
    }));

  const slides = homepageSlides.length > 0 ? homepageSlides : portfolioSlides;

  return (
    <HomeSlideshow
      slides={slides}
      siteName={settings.siteName || "Tim Bylander Design"}
    />
  );
}
