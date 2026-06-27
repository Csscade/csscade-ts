import { z } from "zod";

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
