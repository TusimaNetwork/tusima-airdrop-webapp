/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'static-nft.pancakeswap.com',
    //     pathname: '/mainnet/**',
    //   },
    // ],
    unoptimized:true
  },
  compiler: {
    styledComponents: true,
  },
  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },

};

module.exports = nextConfig;
