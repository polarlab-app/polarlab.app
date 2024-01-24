'use client';

import { useEffect, useState } from 'react';

export default function Page() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userCookie = document.cookie
            .split('; ')
            .find((row) => row.startsWith('user='))
            .split('=')[1];
        const userData = JSON.parse(decodeURIComponent(userCookie));

        setUser(userData);
    }, []);

    return (
        <>
            {user ? (
                <p></p>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
}
