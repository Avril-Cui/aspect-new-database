/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    // serverConnection: "https://aspect-backend.onrender.com",
    serverConnection: "http://127.0.0.1:5000",
    AUTH0_SECRET: "560d635ad8c9130e2f147239a2b05eb699677de18c9479519eef5d54c8fe5b1f",
    AUTH0_BASE_URL: "http://localhost:3000/",
    AUTH0_ISSUER_BASE_URL: "https://dev-by68bdxzfsz4zee3.us.auth0.com",
    AUTH0_CLIENT_ID: "D7iASVLJiFdm6mves3rAUWDsb4k9Ug5q",
    AUTH0_CLIENT_SECRET: "eP6OhLgAmOkJ35UaLX9iLWeFO3DmusPwRC78KLhGTlHA754uqaCdK2cOeiU2JaP8",
  },
};

module.exports = nextConfig;

// module.exports = {
//   distDir: 'build',
//   images: {
//     loader: 'akamai',
//     path: '/',
//   },
// }
