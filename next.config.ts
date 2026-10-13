import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The dev server listens on 0.0.0.0, but the browser opens 127.0.0.1.
  // Without this, Next blocks /_next/hmr and the guide never hydrates.
  allowedDevOrigins: ["127.0.0.1"],
  async rewrites() {
    return [{ source: "/learn", destination: "/learn/index.html" }];
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
