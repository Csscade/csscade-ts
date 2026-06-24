import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { AuthorSchema } from "../authors/authors";

const CONTENT_PATH = path.join(process.cwd(), "src/content");

export const TipSchema = z.object({
  title: z.string(),
  slug: z.string(),
  author: AuthorSchema.shape.slug,
  categories: z.array(z.string()),
  content: z.string(),
});

export type Tip = z.infer<typeof TipSchema>;

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
