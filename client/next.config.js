/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

// module.exports = nextConfig

module.exports = {
  distDir: 'build',
  images: {
    loader: 'akamai',
    path: '/',
  },
}
