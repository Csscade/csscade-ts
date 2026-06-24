import { MDXRemote } from "next-mdx-remote/rsc";
import type { Author } from "@/domain/authors/authors";
import { rehypePlugins, remarkPlugins } from "@/domain/utils/mdx-utils";
import {
  AuthorCard,
  type AuthorCardData,
} from "@/ui/components/organisms/AuthorCard/AuthorCard";

interface Props {
  author: Author;
}

export const AuthorCardContent = ({ author }: Props) => {
  const mappedAuthor: AuthorCardData = {
    name: author.name,
    slug: author.slug,
    avatar: author.avatar,
    pronouns: author.pronouns,
    website: author.website,
    bluesky: author.bluesky,
    mastodon: author.mastodon,
    github: author.github,
    linkedin: author.linkedin,
    bio: (
      <MDXRemote
        source={author.content}
        options={{
          mdxOptions: {
            remarkPlugins,
            rehypePlugins,
          },
        }}
      />
    ),
  };

  return <AuthorCard author={mappedAuthor} />;
};
