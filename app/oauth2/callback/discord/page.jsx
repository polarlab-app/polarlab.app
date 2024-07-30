'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import discordLogin from '@lib/auth/sessionManagement/discordLogin';

export default function Page() {
    const searchParams = useSearchParams();
    const code = searchParams.get('code');

    useEffect(() => {
        async function handleLogin() {
            if (code) {
                const response = await discordLogin(code);
                console.log(response);
                if (response === true) {
                    window.location.assign('/dashboard');
                } else {
                    console.error('Login failed:', response);
                }
            }
        }
        handleLogin();
    });
}
