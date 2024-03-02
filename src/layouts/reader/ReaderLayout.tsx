import Link from "next/link";
import { RSSFeed } from "@/types/RSSFeed";
import "@/app/globals.css";

type Props = {
  feeds: RSSFeed[];
};

export function ReaderLayout({ feeds }: Props) {
  console.log("Reader Layout", feeds);

  return feeds.map((feed) => {
    return (
      <section key={feed.id}>
        <h2>
          <Link href={`/${feed.id}`}>{feed.name}</Link>
        </h2>
      </section>
    );
  });
}
