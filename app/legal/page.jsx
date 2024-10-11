'use server';
import Terms from '@components/legal/terms';
import Privacy from '@components/legal/privacy';
import Nav from '@components/legal/nav';
import styles from '@css/legal/legal.module.scss';
import Cookies from '@components/legal/cookies';

export async function generateMetadata({ searchParams }) {
    const page = searchParams.page;
    let title = 'Polar Lab | Legal';

    if (page == 'terms') {
        title = 'Polar Lab | Legal | Terms of Service';
    } else if (page == 'privacy') {
        title = 'Polar Lab | Legal | Privacy Policy';
    } else if (page == 'cookies') {
        title = 'Polar Lab | Legal | Cookie Policy';
    }

    return {
        title: title,
        description:
            'Review the legal terms and privacy policies of Polar Lab, ensuring transparency and trust as we handle your personal information and provide our services.',
        keywords: ['legal', 'terms of service', 'privacy policy', 'cookie policy', 'Polar Lab'],
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

export default async function Page({ searchParams }) {
    const page = searchParams.page;

    if (!page) {
        window.location.href = '/legal?page=terms';
    }

    return (
        <>
            <Nav />
            <div className={styles.wrapper}>
                <div>{page === 'terms' ? <Terms /> : page === 'privacy' ? <Privacy /> : <Cookies />}</div>
            </div>
        </>
    );
}
