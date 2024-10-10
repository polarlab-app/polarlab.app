import styles from '@css/main/status.module.css';
import GridHeader from '@components/status/gridHeader';
import Stars from '@components/main/stars';
import dynamic from 'next/dynamic';

const StatusGrid = dynamic(() => import('@components/status/statusGrid'));

export default function Page() {
    return (
        <>
            <Stars />
            <div className={styles.main}>
                <div className={styles.statusgrid}>
                    <GridHeader />
                    <StatusGrid />
                </div>
                <div className={styles.statusgrid}>
                    <GridHeader />
                    <StatusGrid />
                </div>
            </div>
        </>
    );
}

export const metadata = {
    title: 'Polar Lab | Status',
    description:
        'Stay updated with the latest status of Polar Lab services, Polaris & Polar MC. Check the operational status of our platforms and services.',
    keywords: ['status', 'Polar Lab', 'service status', 'uptime', 'monitoring'],
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
