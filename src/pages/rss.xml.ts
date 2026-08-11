import rss from "@astrojs/rss";
import { getPublishedPosts } from "../lib/posts";

export async function GET(context: { site: URL }) {
  const posts = await getPublishedPosts();

  return rss({
    title: "Amonstercat Blog",
    description: "技术、音乐、生活与长期写作。",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}/`,
    })),
  });
}
