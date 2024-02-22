'use server';

import '../../src/css/dashboard/dashboardnav.css';
import Link from 'next/link';
import { cookies } from 'next/headers';

export default async function DashboardNav() {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken');

    return (
        <div className='dashboardnav'>
            {accessToken ? (
                <>
                    <div className='sidenavtop'>
                        <div className='tagcontainer'>
                            <h1 className='dashboardheader'>Polaris V2</h1>
                            <div className='tag'>
                                <p className='tagtext'>PLUS</p>
                            </div>
                        </div>
                        <img className='toplogout' src='https://cdn.polarlab.app/src/icons/colorless/log-out.png'></img>
                        <div className='guildselector'></div>
                    </div>
                    <div className='sidenavselection'>
                        <div className='navsection'>
                            <Link className='navsectionitem' href='/dashboard'>
                                <img
                                    className='navsectionimg'
                                    src='https://cdn.polarlab.app/src/icons/colorless/settings.png'></img>
                                <p className='navsectiontext'>Overview</p>
                            </Link>
                            <Link className='navsectionitem' href='/dashboard/settings'>
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
                                <p className='navsectiontext'>Giveaways</p>
                            </Link>
                            <Link className='navsectionitem' href='/'>
                                <img
                                    className='navsectionimg'
                                    src='https://cdn.polarlab.app/src/icons/colorless/settings.png'></img>
                                <p className='navsectiontext'>Birthdays</p>
                            </Link>
                            <Link className='navsectionitem' href='/'>
                                <img
                                    className='navsectionimg'
                                    src='https://cdn.polarlab.app/src/icons/colorless/settings.png'></img>
                                <p className='navsectiontext'>Social Notifications</p>
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
