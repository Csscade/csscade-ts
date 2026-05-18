import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const CONTENT_PATH = path.join(process.cwd(), "src/content");

export const AuthorSchema = z.object({
  name: z.string(),
  slug: z.string(),
  avatar: z.string().url(),
  pronouns: z.string().optional(),
  website: z.string().url().optional(),
  bluesky: z.string().url().optional(),
  mastodon: z.string().url().optional(),
  github: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  content: z.string(),
});

export type Author = z.infer<typeof AuthorSchema>;

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
