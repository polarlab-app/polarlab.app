import '@src/global.css';
import NavBar from './NavBar.jsx';
import Footer from './footer.jsx';

export const metadata = {
    title: 'Polar Lab',
    description: 'Free and Open Source software',
    keywords: ['Polaris', 'open source', 'Polar Lab'],
    authors: [{ name: 'Aertic', url: 'https://polarlab.app' }],
    creator: 'Aetic',
    publisher: 'Aertic',
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

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="body" id="body">
                <NavBar />
                {children}
                <Footer />
            </body>
        </html>
    );
}
