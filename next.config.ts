import type { NextConfig } from "next";

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL ? process.env.NEXT_PUBLIC_URL : "http://localhost:3000";
const parsedUrl = new URL(NEXT_PUBLIC_URL);

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      parsedUrl,
    ],
  },
  experimental: {
    globalNotFound: true
  }
};

export default nextConfig;
