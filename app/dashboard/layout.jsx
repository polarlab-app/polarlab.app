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
            <div className='dashboard'>{children}</div>
        </>
    );
}
