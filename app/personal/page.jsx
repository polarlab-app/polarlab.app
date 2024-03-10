import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Form from '../../components/personal/form.jsx';

import styles from '../../src/css/main/personal.module.css';

export default async function Page() {
    const cookieStore = cookies();
    const token = cookieStore.get('accountToken');

    if (!token) {
        redirect('/login');
    }

    const userDB = await fetch('https://localhost:3000/api/data/findUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
    });

    return (
        <div className={styles.main}>
            <h1 className={styles.header}>Personal</h1>

            <h2 className={styles.subheader}>Account Details</h2>
            <Form></Form>
            <h2 className={styles.subheader}>Privacy</h2>
            <button className={styles.button}>Delete Account</button>
        </div>
    );
}
