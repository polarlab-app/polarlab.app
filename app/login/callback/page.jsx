'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
    const searchParams = useSearchParams();
    const code = searchParams.get('code');

    useEffect(() => {
        async function handleLogin() {
            if (code) {
                const request = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ code: code }),
                });
                if (request.ok) {
                    window.location.assign('/dashboard');
                } else {
                    console.error('Login failed:', request);
                }
            }
        }

        handleLogin();
    }, []);
}
