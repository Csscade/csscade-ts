import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { clsx } from "clsx";
import type React from "react";
import type { ReactNode } from "react";
import "./Badge.css";

export type BadgeIconPosition = "top" | "bottom" | "left" | "right";

export type BadgeProps = {
  children: ReactNode;
  color?: string;
  iconPosition?: BadgeIconPosition;
  rounded?: boolean;
  className?: string;
};

export const Badge = ({
  children,
  color,
  iconPosition = "right",
  rounded = false,
  className,
}: BadgeProps) => {
  return (
    <div
      className={clsx("badge", `badge--icon-${iconPosition}`, { "badge--rounded": rounded }, className)}
      style={color ? ({ "--badge-color": color } as React.CSSProperties) : {}}
    >
      <span className="badge__content">{children}</span>
      <div className="badge__icon">
        <FontAwesomeIcon icon={faPlay} />
      </div>
    </div>
  );
};
