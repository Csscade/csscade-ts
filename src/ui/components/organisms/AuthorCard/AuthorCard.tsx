"use client";

import {
  faBluesky,
  faGithub,
  faLinkedin,
  faMastodon,
} from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "@/ui/components/atoms/Avatar/Avatar";
import { StyledLink } from "@/ui/components/atoms/StyledLink/StyledLink";
import "./AuthorCard.css";
import type React from "react";

export interface AuthorCardData {
  name: string;
  avatar: string;
  pronouns?: string;
  website?: string;
  bluesky?: string;
  mastodon?: string;
  github?: string;
  linkedin?: string;
  bio?: React.ReactNode;
}

interface AuthorCardProps {
  author: AuthorCardData;
}

export const AuthorCard = ({ author }: AuthorCardProps) => {
  return (
    <aside className="author-card framed-four-corners">
      <div className="author-card__header">
        <Avatar
          src={author.avatar}
          alt={author.name}
          size={80}
          className="author-card__avatar"
        />

        <div className="author-card__info">
          <div className="author-card__name-row">
            <h3 className="author-card__name">{author.name}</h3>

            {author.pronouns && (
              <span className="author-card__pronouns">({author.pronouns})</span>
            )}
          </div>

          <div className="author-card__socials">
            {author.website && (
              <StyledLink
                href={author.website}
                iconOnly
                icon={<FontAwesomeIcon icon={faGlobe} />}
                ariaLabel="Site web - lien externe"
                target="_blank"
              />
            )}

            {author.bluesky && (
              <StyledLink
                href={author.bluesky}
                iconOnly
                icon={<FontAwesomeIcon icon={faBluesky} />}
                ariaLabel="Compte Bluesky - lien externe"
                target="_blank"
              />
            )}

            {author.mastodon && (
              <StyledLink
                href={author.mastodon}
                iconOnly
                icon={<FontAwesomeIcon icon={faMastodon} />}
                ariaLabel="Compte Mastodon - lien externe"
                target="_blank"
              />
            )}

            {author.github && (
              <StyledLink
                href={author.github}
                iconOnly
                icon={<FontAwesomeIcon icon={faGithub} />}
                ariaLabel="Compte GitHub - lien externe"
                target="_blank"
              />
            )}

            {author.linkedin && (
              <StyledLink
                href={author.linkedin}
                iconOnly
                icon={<FontAwesomeIcon icon={faLinkedin} />}
                ariaLabel="Compte LinkedIn - lien externe"
                target="_blank"
              />
            )}
          </div>
        </div>
      </div>

      {author.bio && <div className="author-card__bio">{author.bio}</div>}
    </aside>
  );
};
