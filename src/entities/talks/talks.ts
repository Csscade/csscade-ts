import { z } from "zod";
import { AuthorSchema } from "../authors/authors";

export const TalkSchema = z.object({
  title: z.string(),
  slug: z.string(),
  author: AuthorSchema.shape.slug,
  categories: z.array(z.string()),
  publishedAt: z.iso.date(),
  abstract: z.string(),
  level: z.enum(["débutant", "intermédiaire", "expert"]).optional(),
  youtubeId: z.string().optional(),
  slidesUrl: z.string().url().optional(),
  transcript: z.string().optional(),
  content: z.string(),
});

export type Talk = z.infer<typeof TalkSchema>;
