import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { type Author, AuthorSchema } from "@/entities/authors/authors";

const CONTENT_PATH = path.join(process.cwd(), "src/content");

export function readAuthors(): Author[] {
  const authorsPath = path.join(CONTENT_PATH, "authors");
  if (!fs.existsSync(authorsPath)) return [];
  const files = fs.readdirSync(authorsPath);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(authorsPath, file);
      const source = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(source);
      return AuthorSchema.parse({ ...data, content });
    });
}
