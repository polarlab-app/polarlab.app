import '@css/global/global.css';
import '@css/global/icons.css';
import NavBar from '@components/core/NavBar.jsx';
import Footer from '@components/core/footer.jsx';
import { cookies } from 'next/headers';
import CookieConsent from '@components/core/cookieConsent';
import { WebVitals } from '@components/core/webVitals';
import { Toast } from '@components/core/toastNotifications';
import { CSPostHogProvider } from './providers';

export const metadata = {
    title: 'Polar Lab | Home',
    description:
        'Welcome to Polar Lab, your source for innovative services and tools designed to enhance your online experience. Explore our offerings and join our vibrant community today!',
    keywords: ['Polaris', 'open source', 'Polar Lab', 'Discord', 'bot', 'dashboard', 'community', 'tools', 'services'],
    authors: [{ name: 'Aertic', url: 'https://polarlab.app' }],
    creator: 'Aertic',
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
    const cookieConsent = cookies().get('consent');

    return (
        <html lang='en'>
            <CSPostHogProvider>
                <body className='body' id='body'>
                    <WebVitals />
                    <NavBar />
                    <Toast />
                    {cookieConsent ? '' : <CookieConsent />}
                    {children}
                    <Footer />
                </body>
            </CSPostHogProvider>
        </html>
    );
}
