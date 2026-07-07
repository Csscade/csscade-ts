import type React from "react";

const basePath = process.env.PAGES_BASE_PATH ?? "";

export const MdxVideo = ({
  src,
  ...props
}: Omit<React.VideoHTMLAttributes<HTMLVideoElement>, "src"> & {
  src: string;
}) => (
  <video src={src.startsWith("/") ? `${basePath}${src}` : src} {...props} />
);
