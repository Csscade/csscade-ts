import { z } from "zod";
import { AuthorSchema } from "../authors/authors";

export const ArticleSchema = z.object({
  title: z.string(),
  slug: z.string(),
  author: AuthorSchema.shape.slug,
  publishedAt: z.string(),
  categories: z.array(z.string()),
  content: z.string(),
});

export type Article = z.infer<typeof ArticleSchema>;
