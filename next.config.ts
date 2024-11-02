import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'www.foodsafetykorea.go.kr',
        port: '',
        pathname: '/uploadimg/**',
      },
    ],
  },
};

export default nextConfig;
