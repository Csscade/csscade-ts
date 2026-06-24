import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { AuthorSchema } from "../authors/authors";

const CONTENT_PATH = path.join(process.cwd(), "src/content");

export const TalkSchema = z.object({
  title: z.string(),
  slug: z.string(),
  author: AuthorSchema.shape.slug,
  categories: z.array(z.string()),
  publishedAt: z.string(),
  abstract: z.string(),
  level: z.enum(["débutant", "intermédiaire", "expert"]).optional(),
  youtubeId: z.string().optional(),
  slidesUrl: z.string().url().optional(),
  transcript: z.string().optional(),
  content: z.string(),
});

export type Talk = z.infer<typeof TalkSchema>;

export function getAllTalks(): Talk[] {
  const talksPath = path.join(CONTENT_PATH, "talks");
  if (!fs.existsSync(talksPath)) return [];
  const files = fs.readdirSync(talksPath);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(talksPath, file);
      const source = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(source);

      return TalkSchema.parse({
        ...data,
        content,
      });
    })
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
