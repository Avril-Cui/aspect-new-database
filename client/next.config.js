/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    serverConnection: 'http://localhost:5000',
  },
}

module.exports = nextConfig

// module.exports = {
//   distDir: 'build',
//   images: {
//     loader: 'akamai',
//     path: '/',
//   },
// }
