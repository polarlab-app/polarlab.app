'use client';

import '../../src/css/dashboardnav.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function DashboardNav() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userCookie = document.cookie
            .split('; ')
            .find((row) => row.startsWith('user='))
            .split('=')[1];
        const userData = JSON.parse(decodeURIComponent(userCookie));

        setUser(userData);
    }, []);

    return (
        <div className='dashboardnav'>
            {user ? (
                <>
                    <div className='sidenavtop'>
                        <div className='tagcontainer'>
                            <h1 className='dashboardheader'>Polaris V2</h1>
                            <div className='tag'>
                                <p className='tagtext'>PLUS</p>
                            </div>
                        </div>
                        <img className='toplogout' src='https://cdn.polarlab.app/src/icons/colorless/log-out.png'></img>
                    </div>
                    <div className='sidenavselection'>
                        <div className='navsection'>
                            <Link className='navsectionitem' href='/'>
                                <img
                                    className='navsectionimg'
                                    src='https://cdn.polarlab.app/src/icons/colorless/settings.png'></img>
                                <p className='navsectiontext'>Overview</p>
                            </Link>
                            <Link className='navsectionitem' href='/'>
                                <img
                                    className='navsectionimg'
                                    src='https://cdn.polarlab.app/src/icons/colorless/settings.png'></img>
                                <p className='navsectiontext'>Settings</p>
                            </Link>
                            <Link className='navsectionitem' href='/'>
                                <img
                                    className='navsectionimg'
                                    src='https://cdn.polarlab.app/src/icons/colorless/settings.png'></img>
                                <p className='navsectiontext'>Subscription</p>
                            </Link>
                        </div>
                        <div className='navsection'>
                            <p className='navsectionheader'>ENGAGEMENT</p>
                            <Link className='navsectionitem' href='/'>
                                <img
                                    className='navsectionimg'
                                    src='https://cdn.polarlab.app/src/icons/colorless/settings.png'></img>
                                <p className='navsectiontext'>EXP & Levels</p>
                            </Link>
                            <Link className='navsectionitem' href='/'>
                                <img
                                    className='navsectionimg'
                                    src='https://cdn.polarlab.app/src/icons/colorless/settings.png'></img>
                                <p className='navsectiontext'>Music</p>
                            </Link>
                            <Link className='navsectionitem' href='/'>
                                <img
                                    className='navsectionimg'
                                    src='https://cdn.polarlab.app/src/icons/colorless/settings.png'></img>
                                <p className='navsectiontext'>Overview</p>
                            </Link>
                            <Link className='navsectionitem' href='/'>
                                <img
                                    className='navsectionimg'
                                    src='https://cdn.polarlab.app/src/icons/colorless/settings.png'></img>
                                <p className='navsectiontext'>Overview</p>
                            </Link>
                        </div>
                    </div>
                    <div className='sidenavbottom'>
                        <Link className='logout' href='/dashboard/login/logout'>
                            Log Out
                        </Link>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
