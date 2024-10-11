'use server';
import styles from '@css/personal/personal.module.css';
import NavBar from '@/components/personal/nav';
import '@css/global/personal.global.css';
import TopNav from '@/components/personal/topNav';
import { NavProvider } from '@/components/personal/navContext';

export default async function PersonalLayout({ children }) {
    return (
        <NavProvider>
            <TopNav />
            <div className={styles.wrapper}>
                <NavBar />
                {children}
            </div>
        </NavProvider>
    );
}

export async function generateMetadata() {
    return {
        title: 'Polar Lab | Personal Area',
        description:
            'Manage your Polar Lab account with ease. Access your settings, authorized apps, and account details all in one place.',
        keywords: ['personal', 'account management', 'Polar Lab', 'settings', 'authorized apps'],
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
}
