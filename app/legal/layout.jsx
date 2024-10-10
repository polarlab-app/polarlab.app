export const metadata = {
    title: 'Polar Lab | Legal',
    description:
        'Review the legal terms and privacy policies of Polar Lab, ensuring transparency and trust as we handle your personal information and provide our services.',
    keywords: ['legal', 'terms of service', 'privacy policy', 'Polar Lab'],
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
export default async function LegalLayout({ children }) {
    return children;
}
