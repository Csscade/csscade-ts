import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { type Article, ArticleSchema } from "@/entities/articles/articles";

const CONTENT_PATH = path.join(process.cwd(), "src/content");

export function readArticles(): Article[] {
  const articlesPath = path.join(CONTENT_PATH, "articles");
  if (!fs.existsSync(articlesPath)) return [];
  const files = fs.readdirSync(articlesPath);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(articlesPath, file);
      const source = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(source);
      return ArticleSchema.parse({ ...data, content });
    });
}
