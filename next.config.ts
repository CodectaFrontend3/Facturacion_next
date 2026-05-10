import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'jypsac.dyndns.org',
        port: '190',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;