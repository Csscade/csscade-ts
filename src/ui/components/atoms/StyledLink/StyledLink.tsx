import { clsx } from "clsx";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import "./StyledLink.css";

export type StyledLinkProps = {
  href: string;
  children?: ReactNode;
  bordered?: boolean;
  reversed?: boolean;
  iconOnly?: boolean;
  className?: string;
  ariaLabel?: string;
  icon?: ReactNode;
} & ComponentPropsWithoutRef<typeof Link>;

export const StyledLink = ({
  href,
  children,
  bordered = false,
  reversed = false,
  iconOnly = false,
  className = "",
  ariaLabel,
  icon,
  ...props
}: StyledLinkProps) => {
  const isExternal = href.startsWith("http");

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
      aria-label={ariaLabel}
      target={isExternal ? "_blank" : props.target}
      rel={isExternal ? "noopener noreferrer" : props.rel}
      {...props}
    >
      {children}
      {icon && <span className="styled-link--icon">{icon}</span>}
    </Link>
  );
};
