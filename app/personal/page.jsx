import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Form from '@components/personal/form.jsx';
import Privacy from '@components/personal/privacy.jsx';

import styles from '@css/main/personal.module.css';
import findUser from '@lib/personal/findUser.js';

export const metadata = {
    title: 'Polar Lab | Personal',
    description:
        'The official profile management page for you Polar Lab account',
};

export default async function Page() {
    const cookieStore = cookies();
    const token = cookieStore.get('accountToken');

    if (!token) {
        redirect('/login');
    }

    const user = await JSON.parse(await findUser(token.value));

    return (
        <div className={styles.main}>
            <h1 className={styles.header}>Welcome Back, {user.username}</h1>
            <h2 className={styles.subheader}>Account Details</h2>
            <Form></Form>
            <h2 className={styles.subheader}>Privacy</h2>
            <Privacy></Privacy>
        </div>
    );
}
