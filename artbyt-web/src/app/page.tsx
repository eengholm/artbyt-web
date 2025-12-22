import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { Intro } from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/more-stories";
import { getAllPosts, getHomepageSettings } from "@/lib/api";

export default function Index() {
  const homepage = getHomepageSettings();
  const allPosts = getAllPosts();
  const morePosts = allPosts.slice(0, 3); // Show first 3 assignments

  return (
    <main>
      <Container>
        <Intro
          title={homepage.intro?.title}
          subtitle={homepage.intro?.subtitle}
        />
        <HeroPost
          title={homepage.hero?.title || ""}
          coverImage={homepage.hero?.coverImage || ""}
          date={homepage.hero?.date || new Date().toISOString()}
          author={{
            name: homepage.hero?.authorName || "Tim Bylander",
            picture:
              homepage.hero?.authorPicture || "/assets/blog/authors/tim.jpg",
          }}
          slug={homepage.hero?.slug || ""}
          excerpt={homepage.hero?.excerpt || ""}
        />
        {morePosts.length > 0 && <MoreStories posts={morePosts as any} />}
      </Container>
    </main>
  );
}
