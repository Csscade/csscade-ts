import { readTalks } from "@/infrastructure/talks/talks.repository";

export function getAllTalks() {
  return readTalks().sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
