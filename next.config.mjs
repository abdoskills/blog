/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/picoctf',
        destination: '/ctfs?platform=PicoCTF',
        permanent: true,
      },
      {
        source: '/ascwg',
        destination: '/ctfs?platform=ASCWG',
        permanent: true,
      },
      {
        source: '/kaspersky',
        destination: '/ctfs?platform=Kaspersky',
        permanent: true,
      },
      {
        source: '/cgwars',
        destination: '/ctfs',
        permanent: true,
      },
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
