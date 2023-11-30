/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  // Not using any testing for now so disabling strict mode to simulate production environment
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};

module.exports = nextConfig;
