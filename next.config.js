/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    domains: [
      "tmdb.org",
      "image.tmdb.org",
      "themoviedb.org",
      "api.themoviedb.org",
      "https://www.thermofisher.com/",
    ],
  },
};

module.exports = nextConfig;
