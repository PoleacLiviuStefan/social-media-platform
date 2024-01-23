/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    domains: ["thler.com"],
    unoptimized: true,
  },
}

module.exports = nextConfig
