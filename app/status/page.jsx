import { Suspense } from 'react';
import styles from '../../src/css/main/status.module.css';
import StatusGrid from '@/components/status/statusGrid';
import GridHeader from '@/components/status/gridHeader';

export const metadata = {
    title: 'Polar Lab | Status',
    description: 'The official Polar Lab status page',
};

export default function Page() {
    return (
        <>
            <div className='stars'></div>
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
