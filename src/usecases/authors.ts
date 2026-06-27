import { readAuthors } from "@/infrastructure/authors/authors.repository";

export function getAllAuthors() {
  return readAuthors();
}
