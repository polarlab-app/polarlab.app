import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Form from '../../components/personal/form.jsx';
import Privacy from '@/components/personal/privacy.jsx';

import styles from '../../src/css/main/personal.module.css';
import findUser from '@/lib/auth/validation/findUser.js';

export default async function Page() {
    const cookieStore = cookies();
    const token = cookieStore.get('accountToken');

    if (!token.value) {
        redirect('/login');
    }

    const user = await findUser(token.value);

    return (
        <div className={styles.main}>
            <h1 className={styles.header}>Personal</h1>
            <h2 className={styles.subheader}>Account Details</h2>
            <Form></Form>
            <h2 className={styles.subheader}>Privacy</h2>
            <Privacy></Privacy>
        </div>
    );
}
