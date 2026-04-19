import { clsx } from "clsx";
import Link from "next/link";
import type React from "react";
import type { ReactNode } from "react";
import "./StyledLink.css";

export type StyledLinkProps = {
  href: string;
  children?: ReactNode;
  bordered?: boolean;
  reversed?: boolean;
  iconOnly?: boolean;
  className?: string;
  ariaLabel?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export const StyledLink: ({
  href,
  children,
  bordered,
  reversed,
  iconOnly,
  className,
  ariaLabel,
  onClick,
}: StyledLinkProps) => React.JSX.Element = ({
  href,
  children,
  bordered = false,
  reversed = false,
  iconOnly = false,
  className = "",
  ariaLabel,
  onClick,
}: StyledLinkProps) => {
  return (
    <Link
      href={href}
      className={clsx(
        "styled-link",
        bordered && "styled-link--bordered",
        reversed && "styled-link--reversed",
        iconOnly && "styled-link--icon",
        className,
      )}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
};
