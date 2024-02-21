import '../src/global.css';
import NavBar from './NavBar.jsx';
import Footer from './footer.jsx';
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
                <div className='mainwrapper'>{children}</div>
                <Footer />
            </body>
        </html>
    );
}
