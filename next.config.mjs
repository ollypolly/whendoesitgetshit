/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    REACT_APP_TMDB_API_KEY: process.env.REACT_APP_TMDB_API_KEY,
  },
};

export default nextConfig;
