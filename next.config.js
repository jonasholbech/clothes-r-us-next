/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kea-alt-del.dk",
        pathname: "/t7/images/**",
      },
    ],
  },
};

module.exports = nextConfig;
