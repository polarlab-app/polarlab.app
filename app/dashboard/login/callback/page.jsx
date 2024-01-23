'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams, redirect } from 'next/navigation';
import qs from 'qs';

export default function Callback() {
    const [user, setUser] = useState(null);
    const searchParams = useSearchParams();
    const code = searchParams.get('code');

    useEffect(() => {
        const data = qs.stringify({
            client_id: process.env.clientID,
            client_secret: process.env.clientSecret,
            code,
            grant_type: 'authorization_code',
            redirect_uri: process.env.callbackUri,
            scope: 'identify',
        });

        axios
            .request({
                method: 'POST',
                url: 'https://discord.com/api/oauth2/token',
                data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
            .then((tokenResponse) => {
                const accessToken = tokenResponse.data.access_token;

                document.cookie = `token=${accessToken}; max-age=${60 * 60}; path=/`;
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
                    });
            })
            .catch((error) => {
                console.error(error.response.data);
            });
    }, []);

    redirect('/dashboard');
}
