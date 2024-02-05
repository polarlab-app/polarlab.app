'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, redirect } from 'next/navigation';

export default function Page() {
    const searchParams = useSearchParams();
    const code = searchParams.get('code');

    async function thisLoginShitDoesntWork(event) {
        const request = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: code }),
        });
        const result = await request.json();

        if (request.ok) {
            //const accessToken = result.response.access_token;
            //const userData = result.userData;
            /*document.cookie = `user=${JSON.stringify(userData)}; max-age=${
                60 * 60 * 60 * 24
            }; path=/; Secure; SameSite=Lax`;
            document.cookie = `token=${accessToken}; max-age=${60 * 60 * 60 * 24}; path=/; Secure; SameSite=Lax`;*/
            window.location.assign('/dashboard');
        } else {
            console.log(result);
        }
    }

    thisLoginShitDoesntWork();
}
