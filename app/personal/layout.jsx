'use server';
import styles from '@css/personal/personal.module.css';
import NavBar from '@/components/personal/nav';
import '@css/global/personal.global.css';
import TopNav from '@/components/personal/topNav';

export default async function PersonalLayout({ children }) {
    return (
        <>
            <TopNav />
            <div className={styles.wrapper}>
                <NavBar />
                {children}
            </div>
        </>
    );
}
