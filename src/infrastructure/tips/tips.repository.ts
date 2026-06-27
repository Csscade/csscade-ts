import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { type Tip, TipSchema } from "@/entities/tips/tips";

const CONTENT_PATH = path.join(process.cwd(), "src/content");

export function readTips(): Tip[] {
  const tipsPath = path.join(CONTENT_PATH, "tips");
  if (!fs.existsSync(tipsPath)) return [];
  const files = fs.readdirSync(tipsPath);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(tipsPath, file);
      const source = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(source);
      return TipSchema.parse({ ...data, content });
    });
}
