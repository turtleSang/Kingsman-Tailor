import type { NextConfig } from "next";

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000";
const parsedUrl = new URL(NEXT_PUBLIC_URL);

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: (parsedUrl.protocol.replace(":", "") as 'http' | 'https'),
        hostname: parsedUrl.hostname,
        port: parsedUrl.port,
        pathname: parsedUrl.pathname === "/" ? "/:path*" : `${parsedUrl.pathname}:path*`,
      },
    ],
  },
};

export default nextConfig;
