import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import * as Brands from "@fortawesome/free-brands-svg-icons";
import * as Solid from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type React from "react";
import { StyledLink } from "@/ui-kit/components/molecules/StyledLink/StyledLink";

const allIcons = { ...Solid, ...Brands };

export const MdxAnchor = ({
  href,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  if (!href) return <a {...props}>{children}</a>;

  try {
    const url = new URL(href, "https://local.test");
    const bordered = url.searchParams.has("bordered");
    const reversed = url.searchParams.has("reversed");
    const iconOnly = url.searchParams.has("iconOnly");
    const iconName = url.searchParams.get("icon");

    url.searchParams.delete("bordered");
    url.searchParams.delete("reversed");
    url.searchParams.delete("iconOnly");
    url.searchParams.delete("icon");

    const finalHref =
      href.startsWith("http") || href.startsWith("/")
        ? url.toString().replace("https://local.test", "")
        : href;

    let icon: React.ReactNode;
    if (iconName) {
      const faName = iconName.startsWith("fa")
        ? iconName
        : `fa${iconName.charAt(0).toUpperCase()}${iconName.slice(1)}`;

      if (faName in allIcons) {
        icon = (
          <FontAwesomeIcon
            icon={allIcons[faName as keyof typeof allIcons] as IconProp}
          />
        );
      }
    }

    return (
      <StyledLink
        href={finalHref}
        bordered={bordered}
        reversed={reversed}
        iconOnly={iconOnly}
        icon={icon}
        {...props}
      >
        {children}
      </StyledLink>
    );
  } catch (_e) {
    return (
      <StyledLink href={href} {...props}>
        {children}
      </StyledLink>
    );
  }
};
