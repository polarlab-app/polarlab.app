const nextConfig = {
    reactStrictMode: false,
    experimental: {
        missingSuspenseWithCSRBailout: false,
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
                            script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.polarlab.app https://cdn.discordapp.com;
                            style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
                            img-src 'self' data: https://cdn.polarlab.app https://cdn.discordapp.com https://placehold.co;
                            font-src 'self' https://fonts.gstatic.com;
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

module.exports = nextConfig;
