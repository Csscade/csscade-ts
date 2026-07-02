import { type Tip, TipSchema } from "@/entities/tips/tips";
import { readContent } from "@/infrastructure/shared/read-content";

export function readTips(): Tip[] {
  return readContent("tips", TipSchema);
}
