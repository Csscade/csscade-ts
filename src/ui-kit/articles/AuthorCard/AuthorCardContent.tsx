import { MDXRemote } from "next-mdx-remote/rsc";
import type { Author } from "@/entities/authors/authors";
import {
  AuthorCard,
  type AuthorCardData,
} from "@/ui-kit/components/organisms/AuthorCard/AuthorCard";
import { rehypePlugins, remarkPlugins } from "@/usecases/mdx";

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
