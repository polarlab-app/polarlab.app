import '../src/global.css';
import NavBar from './NavBar.jsx';
import Footer from './footer.jsx';
import Loading from './loading.js';
import { Suspense } from 'react';

require('dotenv').config();

export const metadata = {
    title: 'Polar Lab',
    description: 'Foss',
};

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body className='body' id='body'>
                <NavBar />
                <Suspense fallback={<Loading />}>{children}</Suspense>
                <Footer />
            </body>
        </html>
    );
}
