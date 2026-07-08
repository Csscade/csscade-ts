import {
  faBluesky,
  faCodepen,
  faDev,
  faGithub,
  faLinkedin,
  faMastodon,
  faMedium,
} from "@fortawesome/free-brands-svg-icons";
import { faArrowRightLong, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Avatar } from "@/ui-kit/components/atoms/Avatar/Avatar";
import { StyledLink } from "@/ui-kit/components/molecules/StyledLink/StyledLink";
import "./AuthorCard.css";
import type React from "react";

export interface AuthorCardData {
  name: string;
  slug: string;
  avatar: string;
  pronouns?: string;
  website?: string;
  bluesky?: string;
  mastodon?: string;
  github?: string;
  linkedin?: string;
  medium?: string;
  devto?: string;
  codepen?: string;
  bio?: React.ReactNode;
}

interface AuthorCardProps {
  author: AuthorCardData;
  variant?: "default" | "mini";
  /** Heading level for the author's name — "h1" when this card is the page's main heading. */
  headingLevel?: "h1" | "h3";
}

export const AuthorCard = ({
  author,
  variant = "default",
  headingLevel = "h3",
}: AuthorCardProps) => {
  const Heading = headingLevel;

  if (variant === "mini") {
    return (
      <aside className="author-card author-card--mini" aria-label={author.name}>
        <Link href={`/authors/${author.slug}`} className="author-card__link">
          <Avatar
            src={author.avatar}
            alt=""
            size={120}
            className="author-card__avatar"
            border
          />
          <span className="author-card__name">{author.name}</span>
        </Link>
      </aside>
    );
  }

  return (
    <aside className="author-card framed-four-corners">
      <div className="author-card__header">
        <Avatar
          src={author.avatar}
          alt={author.name}
          size={80}
          className="author-card__avatar"
          border
        />

        <div className="author-card__info">
          <div className="author-card__name-row">
            <Heading className="author-card__name">{author.name}</Heading>

            {author.pronouns && (
              <span className="author-card__pronouns">({author.pronouns})</span>
            )}
          </div>

          <div className="author-card__socials">
            {author.website && (
              <StyledLink
                href={author.website}
                iconOnly
                icon={<FontAwesomeIcon icon={faGlobe} aria-hidden />}
                ariaLabel="icône globe"
                target="_blank"
              />
            )}

            {author.bluesky && (
              <StyledLink
                href={author.bluesky}
                iconOnly
                icon={<FontAwesomeIcon icon={faBluesky} aria-hidden />}
                ariaLabel="icône Bluesky"
                target="_blank"
              />
            )}

            {author.mastodon && (
              <StyledLink
                href={author.mastodon}
                iconOnly
                icon={<FontAwesomeIcon icon={faMastodon} aria-hidden />}
                ariaLabel="icône Mastodon"
                target="_blank"
              />
            )}

            {author.github && (
              <StyledLink
                href={author.github}
                iconOnly
                icon={<FontAwesomeIcon icon={faGithub} aria-hidden />}
                ariaLabel="icône GitHub"
                target="_blank"
              />
            )}

            {author.linkedin && (
              <StyledLink
                href={author.linkedin}
                iconOnly
                icon={<FontAwesomeIcon icon={faLinkedin} aria-hidden />}
                ariaLabel="icône LinkedIn"
                target="_blank"
              />
            )}

            {author.medium && (
              <StyledLink
                href={author.medium}
                iconOnly
                icon={<FontAwesomeIcon icon={faMedium} aria-hidden />}
                ariaLabel="icône Medium"
                target="_blank"
              />
            )}

            {author.devto && (
              <StyledLink
                href={author.devto}
                iconOnly
                icon={<FontAwesomeIcon icon={faDev} aria-hidden />}
                ariaLabel="icône dev.to"
                target="_blank"
              />
            )}

            {author.codepen && (
              <StyledLink
                href={author.codepen}
                iconOnly
                icon={<FontAwesomeIcon icon={faCodepen} aria-hidden />}
                ariaLabel="icône CodePen"
                target="_blank"
              />
            )}
          </div>
        </div>
      </div>

      {author.bio && <div className="author-card__bio">{author.bio}</div>}

      <div className="author-card__footer">
        <StyledLink href={`/authors/${author.slug}`} bordered>
          Voir ses publications <FontAwesomeIcon icon={faArrowRightLong} />
        </StyledLink>
      </div>
    </aside>
  );
};
