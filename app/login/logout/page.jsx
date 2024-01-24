'use client';

import { useEffect } from 'react';
import axios from 'axios';
import { redirect } from 'next/navigation';

export default function Page() {
    if (document.cookie !== '') {
        useEffect(() => {
            const tokenCookie = document.cookie
                .split('; ')
                .find((row) => row.startsWith('token='))
                .split('=')[1];

            document.cookie = `user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

            axios
                .post('https://discord.com/api/oauth2/token/revoke', null, {
                    params: {
                        token: tokenCookie,
                    },
                })
                .then(() => {
                    window.location.href = '/login';
                })
                .catch((error) => {
                    console.error('So yea the token revocation failed. What now? No idea tbh im lowkey lost', error);
                });
        }, []);
    } else {
        redirect('/login');
    }
}
