export default async (phase, { defaultConfig }) => {
    const { default: connectToMongo } = await import('./lib/global/db.js');
    await connectToMongo(process.env.MONGO_URI, 'primary');
    await connectToMongo(process.env.BOT_DB_URI, 'secondary');

    const nextConfig = {
        reactStrictMode: false,
        poweredByHeader: false,
        experimental: {
            missingSuspenseWithCSRBailout: false,
            serverActions: {
                allowedOrigins: ['https://polarlab.app', 'polarlab.app', '172.99.0.2:3000'],
                bodySizeLimit: '10mb',
            },
        },
        images: {
            remotePatterns: [
                {
                    protocol: 'https',
                    hostname: 'cdn.polarlab.app',
                    port: '',
                    pathname: '/**',
                },
                {
                    protocol: 'https',
                    hostname: 'cdn.discordapp.com',
                    port: '',
                    pathname: '/**',
                },
                {
                    protocol: 'https',
                    hostname: 'placehold.co',
                    port: '',
                    pathname: '/**',
                },
                {
                    protocol: 'https',
                    hostname: 'images.unsplash.com',
                    port: '',
                    pathname: '/**',
                },
            ],
        },
        devIndicators: {
            autoPrerender: false,
        },
        onDemandEntries: {
            maxInactiveAge: 1000 * 60 * 60,
        },
        async headers() {
            return [
                {
                    source: '/(.*)',
                    headers: [
                        {
                            key: 'Content-Security-Policy',
                            value: `
                            default-src 'self';
                            script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.cloudflareinsights.com;
                            style-src 'self' 'unsafe-inline';
                            img-src 'self' data: https://cdn.polarlab.app https://cdn.discordapp.com https://placehold.co https://images.unsplash.com;
                            font-src 'self';
                            connect-src 'self' https://discord.com https://api.polarlab.app;
                            frame-src 'self';
                            object-src 'none';
                            base-uri 'self';
                            form-action 'self';
                        `
                                .replace(/\s{2,}/g, ' ')
                                .trim(),
                        },
                        {
                            key: 'X-Frame-Options',
                            value: 'DENY',
                        },
                        {
                            key: 'Referrer-Policy',
                            value: 'no-referrer',
                        },
                        {
                            key: 'Permissions-Policy',
                            value: 'geolocation=(), microphone=(), camera=()',
                        },
                    ],
                },
            ];
        },
    };

    const withBundleAnalyzer = (await import('@next/bundle-analyzer')).default({
        enabled: process.env.ANALYZE === 'true',
    });

    return withBundleAnalyzer(nextConfig);
};
