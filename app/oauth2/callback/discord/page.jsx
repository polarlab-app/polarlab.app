'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import discordLogin from '@lib/auth/sessionManagement/discordLogin';
import { useRouter } from 'next/navigation';

export default function Page() {
    const searchParams = useSearchParams();
    const code = searchParams.get('code');
    const router = useRouter();

    useEffect(() => {
        async function handleLogin() {
            if (code) {
                await discordLogin(code);
            } else {
                router.push('/login');
            }
        }
        handleLogin();
    });

    return (
        <>
            <h1>Please Wait...</h1>
            <p>Please wait while we log you in...</p>
        </>
    );
}
