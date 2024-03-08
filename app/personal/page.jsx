import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import styles from '../../src/css/main/personal.module.css';

export default async function Page() {
    const cookieStore = cookies();
    const token = cookieStore.get('accountToken');

    if (!token) {
        redirect('/login');
    }

    const onSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const response = await fetch('/api/submit', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        // Handle the response, e.g., show a success message
        console.log(data);
    };

    const userDB = await fetch('https://localhost:3000/api/data/findUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
    });

    console.log(userDB);

    /*const userDBJ = await userDB.json();

    if (userDBJ.status == 'invalidToken') {
        redirect('/login');
    }*/

    return (
        <div className={styles.main}>
            <h1>Personal</h1>

            <h2>Account Details</h2>
            <h2>Privacy</h2>
        </div>
    );
}
