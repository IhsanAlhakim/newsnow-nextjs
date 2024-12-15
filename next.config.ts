import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xomtavowsmfwgqvpdtcy.supabase.co",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
