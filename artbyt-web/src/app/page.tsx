import Container from "@/app/_components/container";
import { FeaturedAssignment } from "@/app/_components/featured-assignment";
import { Intro } from "@/app/_components/intro";
import { MoreAssignments } from "@/app/_components/more-assignments";
import { PortfolioScroll } from "@/app/_components/portfolio-scroll";
import { Testimonials } from "@/app/_components/testimonials";
import {
  getAllAssignments,
  getHomepageSettings,
  getAssignmentBySlug,
  getPortfolioSettings,
  getAssignmentsWithTestimonials,
} from "@/lib/api";

// Revalidate every hour
export const revalidate = 3600;

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

  // Get testimonials from assignments
  const assignmentsWithTestimonials = getAssignmentsWithTestimonials();
  const testimonials = assignmentsWithTestimonials
    .filter((a) => a.testimonial)
    .map((a) => ({
      testimonial: a.testimonial!,
      assignmentTitle: a.title,
      assignmentSlug: a.slug,
    }))
    .slice(0, 3); // Show max 3 on homepage

  return (
    <main>
      <Container>
        <Intro
          title={homepage.intro?.title}
          subtitle={homepage.intro?.subtitle}
        />
        {featuredAssignment && (
          <FeaturedAssignment
            title={featuredAssignment.title || ""}
            coverImage={featuredAssignment.coverImage || ""}
            slug={featuredAssignment.slug}
            excerpt={featuredAssignment.excerpt || ""}
          />
        )}
        {moreAssignments.length > 0 && (
          <MoreAssignments assignments={moreAssignments as any} />
        )}
        <Testimonials testimonials={testimonials} />
        <PortfolioScroll images={portfolioData.images || []} />
      </Container>
    </main>
  );
}
