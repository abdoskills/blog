/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/posts/picoctf-c0rrup',
        destination: '/posts/picoctf-c0rrupt',
        permanent: true,
      },
      {
        source: '/c0rrupt',
        destination: '/posts/picoctf-c0rrupt',
        permanent: true,
      },
      {
        source: '/posts/c0rrupt',
        destination: '/posts/picoctf-c0rrupt',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
