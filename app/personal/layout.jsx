'use server';
import styles from '@css/personal/personal.module.css';
import NavBar from '@/components/personal/nav';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function PersonalLayout({ children }) {
    if (!cookies().get('accountToken') || !cookies().get('username')) {
        redirect('/login');
    }

    return (
        <div className={styles.wrapper}>
            <NavBar />
            {children}
        </div>
    );
}
