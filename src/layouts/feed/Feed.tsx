import type { Feed, FeedPageProps } from "@/pages/[feed]";
import "@/app/globals.css";

export function FeedLayout(props: FeedPageProps) {
  return props.feed.items.map((item) => {
    return (
      <article key={item.guid}>
        <h2>
          <a href={item.link}>
            {item.title} | {item.pubDate}
          </a>
        </h2>
        <div dangerouslySetInnerHTML={{ __html: item.content }} />
      </article>
    );
  });
}
