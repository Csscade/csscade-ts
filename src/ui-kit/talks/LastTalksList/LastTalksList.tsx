import type { Author } from "@/entities/authors/authors";
import type { Talk } from "@/entities/talks/talks";
import { TalksList } from "@/ui-kit/talks/TalksList/TalksList";
import "./LastTalksList.css";

interface LastTalksListProps {
  talks: Talk[];
  authors: Author[];
  limit?: number;
}

export const LastTalksList = ({
  talks,
  authors,
  limit = 3,
}: LastTalksListProps) => {
  const visible = talks.slice(0, limit > 0 ? limit : undefined);

  return <TalksList headingLevel={3} talks={visible} authors={authors} />;
};
