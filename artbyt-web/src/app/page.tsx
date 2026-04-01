import Container from "@/app/_components/ui/container";
import { Intro } from "@/app/_components/layout/intro";
import { RecentArtwork } from "@/app/_components/assignments/recent-artwork";
import { MoreAssignments } from "@/app/_components/assignments/more-assignments";
import { CtaSection } from "@/app/_components/shared/cta-section";
import {
  getAllAssignments,
  getHomepageSettings,
} from "@/lib/api";

// Revalidate every hour
export const revalidate = 3600;

export default function Index() {
  const homepage = getHomepageSettings();
  const allAssignments = getAllAssignments();

  return (
    <main>
      <Container>
        <Intro
          title={homepage.intro?.title}
          subtitle={homepage.intro?.subtitle}
          description={homepage.intro?.description}
          primaryButton={homepage.intro?.primaryButton}
          secondaryButton={homepage.intro?.secondaryButton}
        />
        <RecentArtwork
          assignments={allAssignments}
          totalCount={allAssignments.length}
        />
        <MoreAssignments assignments={allAssignments} />
        <CtaSection />
      </Container>
    </main>
  );
}
