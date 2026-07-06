import { z } from "zod";
import { AuthorSchema } from "../authors/authors";

export const TipSchema = z.object({
  title: z.string(),
  slug: z.string(),
  author: AuthorSchema.shape.slug,
  coAuthor: z.string().optional(),
  categories: z.array(z.string()),
  content: z.string(),
});

export type Tip = z.infer<typeof TipSchema>;
