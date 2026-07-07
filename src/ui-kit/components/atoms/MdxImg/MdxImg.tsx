import type React from "react";

const basePath = process.env.PAGES_BASE_PATH ?? "";

export const MdxImg = ({
  src,
  ...props
}: Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string;
}) => {
  return (
    // biome-ignore lint/a11y/useAltText: alt is always supplied by the MDX author via ...props
    <img
      src={src.startsWith("/") ? `${basePath}${src}` : src}
      loading="lazy"
      {...props}
    />
  );
};
