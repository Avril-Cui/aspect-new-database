/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    serverConnection: 'http://127.0.0.1:5000',
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
