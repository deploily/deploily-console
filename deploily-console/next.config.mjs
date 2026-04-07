
// Enforce https NEXTAUTH_URL in production at build/start time
if (process.env.NODE_ENV === 'production') {
    const nextAuthUrl = process.env.NEXTAUTH_URL || '';
    if (nextAuthUrl && !nextAuthUrl.startsWith('https://')) {
        throw new Error('Security policy violation: NEXTAUTH_URL must start with https:// in production.');
    }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['next-international', 'international-types', "deploily-ui-components"],
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

