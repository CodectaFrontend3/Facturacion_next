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
      {
        protocol: 'https',
        hostname: 'img.magnific.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'png.pngtree.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.gsmarketing.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn3d.iconscout.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static.vecteezy.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
