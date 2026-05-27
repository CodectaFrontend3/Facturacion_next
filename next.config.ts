import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // @ts-expect-error: reactCompiler es experimental y los tipos de TS pueden no estar actualizados
    reactCompiler: true,
  },
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