import type { RSSFeed } from "@/types/RSSFeed";
import fs from "fs";
import path from "path";

export async function getRSSFeeds(): Promise<RSSFeed[]> {
  try {
    const filePath = path.join(process.cwd(), "src", "db", "db.json");
    const data = await fs.promises.readFile(filePath, "utf8");
    const records = JSON.parse(data);
    if (records.feeds.length > 0) {
      return records.feeds;
    }
    return [{ id: 0, url: "", name: "" }];
  } catch (error) {
    console.error("error parsing data: ", error);
    return [{ id: 0, url: "", name: "" }];
  }
}
