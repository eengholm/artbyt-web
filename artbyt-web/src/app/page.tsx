import Container from "@/app/_components/container";
import { FeaturedAssignment } from "@/app/_components/featured-assignment";
import { Intro } from "@/app/_components/intro";
import { MoreAssignments } from "@/app/_components/more-assignments";
import { PortfolioScroll } from "@/app/_components/portfolio-scroll";
import {
  getAllAssignments,
  getHomepageSettings,
  getAssignmentBySlug,
  getPortfolioSettings,
} from "@/lib/api";

export default function Index() {
  const homepage = getHomepageSettings();
  const allAssignments = getAllAssignments();
  const portfolioData = getPortfolioSettings();

  // Get the featured assignment
  const featuredAssignment = homepage.featuredAssignment
    ? getAssignmentBySlug(homepage.featuredAssignment)
    : allAssignments[0]; // Fallback to first assignment if none selected

  // Get selected assignments for More Assignments, or fallback to first 3
  const moreAssignments =
    homepage.moreStories && homepage.moreStories.length > 0
      ? homepage.moreStories.map((slug: string) => getAssignmentBySlug(slug))
      : allAssignments.slice(0, 3);

  return (
    <main>
      <Container>
        <Intro
          title={homepage.intro?.title}
          subtitle={homepage.intro?.subtitle}
        />
        <FeaturedAssignment
          title={featuredAssignment.title || ""}
          coverImage={featuredAssignment.coverImage || ""}
          slug={featuredAssignment.slug}
          excerpt={featuredAssignment.excerpt || ""}
        />
        {moreAssignments.length > 0 && (
          <MoreAssignments assignments={moreAssignments as any} />
        )}
        <PortfolioScroll images={portfolioData.images || []} />
      </Container>
    </main>
  );
}
