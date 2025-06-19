
/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['next-international', 'international-types',"deploily-ui-components"],
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'console.deploily.cloud',
                pathname: '**',
            },
        ],
    },

    swcMinify: true
};

export default nextConfig

