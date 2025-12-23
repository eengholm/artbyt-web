import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { Intro } from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/more-stories";
import { getAllPosts, getHomepageSettings, getAssignmentBySlug } from "@/lib/api";

export default function Index() {
  const homepage = getHomepageSettings();
  const allPosts = getAllPosts();
  
  // Get the featured assignment
  const featuredAssignment = homepage.featuredAssignment 
    ? getAssignmentBySlug(homepage.featuredAssignment)
    : allPosts[0]; // Fallback to first assignment if none selected
  
  const morePosts = allPosts.slice(0, 3); // Show first 3 assignments

  return (
    <main>
      <Container>
        <Intro
          title={homepage.intro?.title}
          subtitle={homepage.intro?.subtitle}
        />
        <HeroPost
          title={featuredAssignment.title || ""}
          coverImage={featuredAssignment.coverImage || ""}
          date={featuredAssignment.createdAt.toISOString()}
          author={featuredAssignment.author || {
            name: "Tim Bylander",
            picture: "/assets/blog/authors/tim.jpg",
          }}
          slug={featuredAssignment.slug}
          excerpt={featuredAssignment.excerpt || ""}
        />
        />
        {morePosts.length > 0 && <MoreStories posts={morePosts as any} />}
      </Container>
    </main>
  );
}
