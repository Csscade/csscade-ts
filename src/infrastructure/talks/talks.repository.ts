import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { type Talk, TalkSchema } from "@/entities/talks/talks";

const CONTENT_PATH = path.join(process.cwd(), "src/content");

export function readTalks(): Talk[] {
  const talksPath = path.join(CONTENT_PATH, "talks");
  if (!fs.existsSync(talksPath)) return [];
  const files = fs.readdirSync(talksPath);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(talksPath, file);
      const source = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(source);
      return TalkSchema.parse({ ...data, content });
    });
}
