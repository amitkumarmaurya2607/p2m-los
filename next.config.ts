import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  allowedDevOrigins: ["192.168.1.42"],
  async rewrites() {
    return [
      {
        source: "/los-service/:path*",
        destination:
          "https://multinucleolate-angularly-conrad.ngrok-free.dev/los-service/:path*",
      },
    ];
  },
};

export default nextConfig;
