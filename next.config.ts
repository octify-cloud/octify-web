import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  webpack: (config, { dev }) => {
    if (dev) {
      // Suppress webpack cache warnings in development
      config.infrastructureLogging = {
        level: "error",
      };
    }
    return config;
  },
};

export default nextConfig;
