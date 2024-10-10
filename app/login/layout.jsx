export const metadata = {
    title: 'Polar Lab | Login',
    description:
        'Access your Polar Lab account securely through our login page. Enjoy seamless access to all our services, manage your settings, and stay connected with our community. If you are new, create an account to explore the full range of features we offer.',
    keywords: ['login', 'Polar Lab', 'account', 'community'],
    authors: [{ name: 'Aertic', url: 'https://polarlab.app' }],
    creator: 'Aertic',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        images: [
            {
                url: 'https://cdn.polarlab.app/src/img/polarlogo.png',
                width: 1200,
                height: 630,
            },
        ],
    },
};
export default async function LoginLayout({ children }) {
    return children;
}
