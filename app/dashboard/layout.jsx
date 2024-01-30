'use client';

import DashboardNav from './dashboardNav.jsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import '../../src/css/dashboard.css';

export default function DashboardLayout({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userCookie = document.cookie
            .split(';')
            .find((row) => row.startsWith('user='))
            .split('=')[1];
        const userData = JSON.parse(decodeURIComponent(userCookie));

        setUser(userData);
    }, []);

    return (
        <>
            <DashboardNav />
            <div className='dashboard'>
                <div className='dashboardtopbar'>
                    <div className='topbarlinkcontainer'>
                        <Link href='/' className='topbarlink'>
                            Home
                        </Link>
                        <Link href='https://docs.polarlab.app/polaris' className='topbarlink'>
                            Docs
                        </Link>
                        <Link href='/discord' className='topbarlink'>
                            Support
                        </Link>
                    </div>
                    {user ? (
                        <div className='profilecontainer'>
                            <p className='username'>{user.username}</p>
                            <img
                                src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                                className='profilepicture'></img>
                        </div>
                    ) : (
                        <p>Loading..</p>
                    )}
                </div>
                {children}
            </div>
        </>
    );
}
