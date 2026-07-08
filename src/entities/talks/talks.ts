import { z } from "zod";
import { AuthorSchema } from "../authors/authors";

export const TalkSchema = z.object({
  title: z.string(),
  slug: z.string(),
  author: AuthorSchema.shape.slug,
  coAuthor: z.string().optional(),
  categories: z.array(z.string()),
  publishedAt: z.iso.date(),
  abstract: z.string(),
  level: z.enum(["découverte", "intermédiaire", "expertise"]).optional(),
  youtubeId: z.string().optional(),
  slidesUrl: z.url().optional(),
  content: z.string(),
});

export type Talk = z.infer<typeof TalkSchema>;
