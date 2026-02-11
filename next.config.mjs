/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '1337',
                pathname: '/uploads/**',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '/**',
            }, {
                protocol: 'https',
                hostname: 'strapi.ecomv2.online',
                pathname: '/uploads/**',
            },
        ],
    },
};

export default nextConfig;
