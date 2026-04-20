"use client";

import type { Author } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import {
  AuthorCard,
  type AuthorCardData,
} from "@/ui/components/organisms/AuthorCard/AuthorCard";

interface Props {
  author: Author;
}

export const AuthorCardContent = ({ author }: Props) => {
  const MDXContent = useMDXComponent(author.body.code);

  const mappedAuthor: AuthorCardData = {
    name: author.name,
    avatar: author.avatar,
    pronouns: author.pronouns,
    website: author.website,
    bluesky: author.bluesky,
    mastodon: author.mastodon,
    github: author.github,
    linkedin: author.linkedin,
    bio: <MDXContent />,
  };

  return <AuthorCard author={mappedAuthor} />;
};
