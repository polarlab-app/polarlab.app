import '@css/global/global.css';
import '@css/global/icons.css';
import NavBar from '@components/core/NavBar.jsx';
import Footer from '@components/core/footer.jsx';
import { cookies } from 'next/headers';
import CookieConsent from '@components/core/cookieConsent';
import { WebVitals } from '@components/core/webVitals';
import { Toast } from '@components/core/toastNotifications';

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
    const cookieConsent = cookies().get('consent');

    return (
        <html lang='en'>
            <body className='body' id='body'>
                <WebVitals />
                <NavBar />
                <Toast />
                {cookieConsent ? '' : <CookieConsent />}
                {children}
                <Footer />
            </body>
        </html>
    );
}
