import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { AuthorSchema } from "./authors";

const CONTENT_PATH = path.join(process.cwd(), "src/content");

export const ArticleSchema = z.object({
  title: z.string(),
  slug: z.string(),
  author: AuthorSchema.shape.slug,
  publishedAt: z.string(),
  categories: z.array(z.string()),
  content: z.string(),
});

export type Article = z.infer<typeof ArticleSchema>;

export function getAllArticles(): Article[] {
  const articlesPath = path.join(CONTENT_PATH, "articles");
  if (!fs.existsSync(articlesPath)) return [];
  const files = fs.readdirSync(articlesPath);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(articlesPath, file);
      const source = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(source);

      return ArticleSchema.parse({
        ...data,
        content,
      });
    });
}
