import { z } from "zod";
import { AuthorSchema } from "../authors/authors";

export const ArticleSchema = z.object({
  title: z.string(),
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  author: AuthorSchema.shape.slug,
  coAuthor: z.string().optional(),
  publishedAt: z.string(),
  categories: z.array(z.string()),
  originalUrl: z.url().optional(),
  content: z.string(),
});

export type Article = z.infer<typeof ArticleSchema>;
