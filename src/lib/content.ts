import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const CONTENT_PATH = path.join(process.cwd(), "src/content");

export const AuthorSchema = z.object({
  name: z.string(),
  slug: z.string(),
  avatar: z.url(),
  pronouns: z.string().optional(),
  website: z.url().optional(),
  bluesky: z.url().optional(),
  mastodon: z.url().optional(),
  github: z.url().optional(),
  linkedin: z.url().optional(),
  content: z.string(),
});

export type Author = z.infer<typeof AuthorSchema>;

export const ArticleSchema = z.object({
  title: z.string(),
  slug: z.string(),
  author: AuthorSchema.shape.slug,
  publishedAt: z.string(),
  categories: z.array(z.string()),
  content: z.string(),
});

export type Article = z.infer<typeof ArticleSchema>;

export const TipSchema = z.object({
  title: z.string(),
  slug: z.string(),
  author: AuthorSchema.shape.slug,
  categories: z.array(z.string()),
  content: z.string(),
});

export type Tip = z.infer<typeof TipSchema>;

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

export function getAllTips(): Tip[] {
  const tipsPath = path.join(CONTENT_PATH, "tips");
  if (!fs.existsSync(tipsPath)) return [];
  const files = fs.readdirSync(tipsPath);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(tipsPath, file);
      const source = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(source);

      return TipSchema.parse({
        ...data,
        content,
      });
    });
}

export function getAllAuthors(): Author[] {
  const authorsPath = path.join(CONTENT_PATH, "authors");
  if (!fs.existsSync(authorsPath)) return [];
  const files = fs.readdirSync(authorsPath);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(authorsPath, file);
      const source = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(source);

      return AuthorSchema.parse({
        ...data,
        content,
      });
    });
}
