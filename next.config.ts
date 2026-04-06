import type { NextConfig } from "next";
import { withContentlayer } from "next-contentlayer";
import path from "path";

const basePath = process.env.PAGES_BASE_PATH || "";

const nextConfig: NextConfig = {
  assetPrefix: basePath,
  basePath: basePath,
  experimental: {
    mdxRs: true,
  },
  images: {
    unoptimized: true,
  },
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default withContentlayer(nextConfig);
