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
};

export const StyledLink: ({
  href,
  children,
  bordered,
  reversed,
  iconOnly,
  className,
}: StyledLinkProps) => React.JSX.Element = ({
  href,
  children,
  bordered = false,
  reversed = false,
  iconOnly = false,
  className = "",
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
    >
      {children}
    </Link>
  );
};
