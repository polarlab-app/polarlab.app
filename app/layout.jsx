import '../src/global.css';
import NavBar from './NavBar.jsx';
import Footer from './footer.jsx';

require('dotenv').config();

export const metadata = {
    title: 'Polar Lab',
    description: 'Free and Open Source software',
};

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body className='body' id='body'>
                <NavBar />
                {children}
                <Footer />
            </body>
        </html>
    );
}
