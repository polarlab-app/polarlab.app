'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import discordLogin from '@/lib/auth/discordLogin';

export default function Page() {
    const searchParams = useSearchParams();
    const code = searchParams.get('code');

    useEffect(() => {
        async function handleLogin() {
            if (code) {
                const response = await discordLogin(code);
                if (response == 'success') {
                    window.location.assign('/dashboard');
                } else {
                    console.error('Login failed:', response);
                }
            }
        }

        handleLogin();
    }, [code]);
}
