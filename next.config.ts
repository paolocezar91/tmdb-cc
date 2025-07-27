import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/t/p/w500/**',
        search: '',
      },
    ],
  },
  env: {
    TMDB_API_READ_TOKEN: process.env.TMDB_API_READ_TOKEN,
    TMDB_API_KEY: process.env.TMDB_API_KEY
  },
};

export default nextConfig;
