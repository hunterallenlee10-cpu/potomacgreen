import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Pre-sized .webp files are made by scripts/optimize-images.mjs.
    // lib/image-loader.ts maps each requested width to the closest file.
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    deviceSizes: [640, 960, 1280, 1920, 2400],
    imageSizes: [64, 128, 256, 384],
  },
  poweredByHeader: false,
};

export default nextConfig;
