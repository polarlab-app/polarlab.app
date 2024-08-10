import { Suspense } from 'react';
import styles from '@css/main/status.module.css';
import GridHeader from '@components/status/gridHeader';
import Stars from '@components/main/stars';
import dynamic from 'next/dynamic';

const StatusGrid = dynamic(() => import('@components/status/statusGrid'));

export const metadata = {
    title: 'Polar Lab | Status',
    description: 'The official Polar Lab status page',
};

export default function Page() {
    return (
        <>
            <Stars />
            <div className={styles.main}>
                <div className={styles.statusgrid}>
                    <GridHeader />
                    <Suspense fallback={<p>Loading Content...</p>}>
                        <StatusGrid />
                    </Suspense>
                </div>
                <div className={styles.statusgrid}>
                    <GridHeader />
                </div>
            </div>
        </>
    );
}
