import { GetStaticProps, GetStaticPaths } from "next";
import Parser from "rss-parser";
// import { FeedPageProps, FeedPageQuery, Feed } from "../../types";
import { RSSFeed } from "@/types/RSSFeed";
import { FeedLayout } from "@/layouts/feed/Feed";
import { getRSSFeeds } from "@/db/getRSSFeeds";

type FeedPageProps = {
  id: RSSFeed["id"];
  url: RSSFeed["url"];
  name: RSSFeed["name"];
  feed: Feed;
};

type FeedPageQuery = { feed: string };

type Feed = {
  title: string;
  description: string;
  lastBuildDate: string;
  items: Array<{
    guid: string;
    title: string;
    link: string;
    content: string;
    contentSnippet: string;
    isoDate: string;
    pubDate: string;
  }>;
};

export const getStaticProps: GetStaticProps<
  FeedPageProps,
  FeedPageQuery
> = async ({ params }) => {
  const id = Number(params?.feed);
  const parser = new Parser(); // instantiate every time?
  const feeds = await getRSSFeeds();
  const found = feeds.find((feed) => feed.id === id);
  const res = await fetch(found!.url);
  const rss = await res.text();
  const feed = (await parser.parseString(rss)) as unknown as Feed;
  return {
    props: { feed, id: found!.id, name: found!.name, url: found!.url },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths<FeedPageQuery> = async () => {
  const feeds = await getRSSFeeds();
  console.log("getStaticPaths", feeds);
  const paths = feeds.map((feed) => {
    return { params: { feed: feed.id.toString() } };
  });
  return { paths, fallback: "blocking" };
};

export default FeedLayout;
