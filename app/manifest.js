export default function manifest() {
    return {
        name: 'Polaris Dashboard',
        short_name: 'Polaris',
        description: 'The ultimate discord experience',
        start_url: '/dashboard/logging',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
            {
                src: '/public/android-chrome-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/public/android-chrome-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    };
}
