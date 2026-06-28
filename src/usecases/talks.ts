import { readTalks } from "@/infrastructure/talks/talks.repository";

export function getAllTalks() {
  return readTalks().sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getLastTalks(limit: number) {
  return readTalks()
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, limit);
}
