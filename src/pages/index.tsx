import { GetStaticProps } from "next";
import { ReaderProps } from "@/types/ReaderProps";
import { ReaderLayout } from "@/layouts/reader/ReaderLayout";
import { getRSSFeeds } from "@/db/getRSSFeeds";
import "@/app/globals.css";

export const getStaticProps: GetStaticProps<ReaderProps> = async () => {
  const feeds = await getRSSFeeds();
  console.log("index->getStaticProps", feeds);
  return { props: { feeds }, revalidate: 1 };
};

export default ReaderLayout;
