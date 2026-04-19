import { clsx } from "clsx";
import "./Avatar.css";

export type AvatarProps = {
  src: string;
  alt: string;
  size?: number;
  className?: string;
};

export const Avatar = ({ src, alt, size = 40, className }: AvatarProps) => {
  return (
    <figure className={clsx("avatar-link", className)}>
      <img
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="avatar-image"
      />
    </figure>
  );
};
