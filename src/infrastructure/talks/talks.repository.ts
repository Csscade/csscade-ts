import { type Talk, TalkSchema } from "@/entities/talks/talks";
import { readContent } from "@/infrastructure/shared/read-content";

export function readTalks(): Talk[] {
  return readContent("talks", TalkSchema);
}
