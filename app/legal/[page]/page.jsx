'use server';
import Terms from '@components/legal/terms';
import Privacy from '@components/legal/privacy';
import Nav from '@components/legal/nav';
import styles from '@css/legal/legal.module.scss';
import Cookies from '@components/legal/cookies';
import { redirect } from 'next/navigation';

export async function generateMetadata({ params }) {
    const page = params.page;
    let title = 'Polar Lab | Legal';
    let description =
        'Review the legal terms and privacy policies of Polar Lab, ensuring transparency and trust as we handle your personal information and provide our services.';

    if (page == 'terms') {
        title = 'Polar Lab | Legal | Terms of Service';
        description =
            'Review the legal terms of Polar Lab, ensuring transparency and trust as we handle your personal information and provide our services.';
    } else if (page == 'privacy') {
        title = 'Polar Lab | Legal | Privacy Policy';
        description =
            'Review the privacy policy of Polar Lab, ensuring transparency and trust as we handle your personal information and provide our services.';
    } else if (page == 'cookies') {
        title = 'Polar Lab | Legal | Cookie Policy';
        description =
            'Review the cookie policy of Polar Lab, ensuring transparency and trust as we handle your personal information and provide our services.';
    }

    return {
        title: title,
        description: description,
        keywords: ['legal', 'terms of service', 'privacy policy', 'cookie policy', 'Polar Lab', 'Polaris'],
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

export default async function Page({ params }) {
    const page = params.page;

    if (!page) {
        redirect('/legal/terms');
    }

    return (
        <>
            <Nav />
            <div className={styles.wrapper}>
                <div>
                    {page === 'terms' ? (
                        <Terms />
                    ) : page === 'privacy' ? (
                        <Privacy />
                    ) : page === 'cookies' ? (
                        <Cookies />
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </>
    );
}
