/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.pixelbin.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
      {
        protocol: 'https',
        hostname: 'www.styleglow.com',
      },
      {
        protocol: 'https',
        hostname: 'taruntahiliani.com',
      },
      {
        protocol: 'https',
        hostname: 'www.swagshirts99.com',
      },
      {
        protocol: 'https',
        hostname: 'static.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'th.bing.com',
      },
    ],
    // Combine all domains into a single array
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://www.wixapis.com/:path*', // Proxy to Wix API
      },
    ];
  },
};

export default nextConfig;
