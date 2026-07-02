import { compareDesc } from "date-fns";
import { readTalks } from "@/infrastructure/talks/talks.repository";

export function getAllTalks() {
  return [...readTalks()].sort((a, b) =>
    compareDesc(new Date(a.publishedAt), new Date(b.publishedAt)),
  );
}

export function getLastTalks(limit: number) {
  return getAllTalks().slice(0, limit);
}
