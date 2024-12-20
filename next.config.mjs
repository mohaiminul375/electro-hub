/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.ibb.co.com',  // Use the correct hostname
                port: '',
                pathname: '/**',  // Allow all paths under this domain
            },
            {
                protocol: 'https',
                hostname: 'i.ibb.co',  // Use the correct hostname
                port: '',
                pathname: '/**',  // Allow all paths under this domain
            },
        ],
    },
    typescript: {
        ignoreBuildErrors: true,  // This will ignore TypeScript errors during the build
    },
    experimental: {
        modern: true,
    },
};

export default nextConfig;
