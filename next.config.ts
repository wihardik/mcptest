import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow picsum.photos for remote placeholder images used in the clone
    domains: ["picsum.photos"],
    // If you prefer to bypass domain checks set `unoptimized: true` instead
    // unoptimized: true,
  },
  /* other config options can go here */
};

export default nextConfig;
