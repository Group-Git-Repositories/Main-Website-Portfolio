/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/IMG_1564jfurur',
        destination: '/IMG_1564jfurur.png',
      },
    ];
  },
};

module.exports = nextConfig;
