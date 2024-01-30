'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, redirect } from 'next/navigation';
import axios from 'axios';

export default function Callback() {
    const searchParams = useSearchParams();
    const code = searchParams.get('code');

    const [user, setUser] = useState('');

    async function thisLoginShitDoesntWork(event) {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: code }),
        });

        if (response.ok) {
            const accessToken = response.access_token;
            document.cookie = `token=${accessToken}; max-age=${60 * 60 * 60}; path=/`;
            axios
                .get('https://discord.com/api/users/@me', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                .then((userResponse) => {
                    const userData = userResponse.data;

                    document.cookie = `user=${JSON.stringify(userData)}; max-age=${60 * 60}; path=/`;

                    setUser(userData);
                })
                .catch((error) => {
                    console.log(error);
                });
            //window.location.assign('/dashboard');
        } else {
            const error = await response.text();
            alert(`Failed to log in: ${error}`);
        }
    }

    useEffect(() => {
        thisLoginShitDoesntWork();
    }, []);
}
