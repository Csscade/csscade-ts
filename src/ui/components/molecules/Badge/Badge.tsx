import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { clsx } from "clsx";
import type { ReactNode } from "react";
import "./Badge.css";

export type BadgeIconPosition = "top" | "bottom" | "left" | "right";

export type BadgeProps = {
  children: ReactNode;
  color?: string;
  iconPosition?: BadgeIconPosition;
  className?: string;
};

export const Badge = ({
  children,
  color,
  iconPosition = "right",
  className,
}: BadgeProps) => {
  return (
    <div
      className={clsx("badge", `badge--icon-${iconPosition}`, className)}
      style={color ? ({ "--badge-color": color } as React.CSSProperties) : {}}
    >
      <span className="badge__content">{children}</span>
      <FontAwesomeIcon icon={faPlay} className="badge__icon" />
    </div>
  );
};
