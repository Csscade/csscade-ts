import type { NextConfig } from "next";
import { withContentlayer } from "next-contentlayer";

const nextConfig: NextConfig = {
  assetPrefix: process.env.PAGES_BASE_PATH,
  basePath: process.env.PAGES_BASE_PATH,
  experimental: {
    mdxRs: true,
  },
  images: {
    unoptimized: true,
  },
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  turbopack: {},
};

export default withContentlayer(nextConfig);
