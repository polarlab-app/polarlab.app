'use client';

import '@css/dashboard/dashboardnav.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import getGuilds from '@lib/dashboard/getGuilds';
import styles from '@css/dashboard/navdropdown.module.css';

export default function DashboardNav() {
    const [guilds, setGuilds] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openStatus, setOpenStatus] = useState(false);
    const [selectedGuild, setSelectedGuild] = useState(null);

    useEffect(() => {
        async function fetchGuilds() {
            const guildData = await getGuilds();
            setGuilds(guildData);
            setLoading(false);
            if (guildData && guildData.length > 0) {
                setSelectedGuild(guildData[0]);
            }
            console.log(guildData);
        }
        fetchGuilds();
    }, []);

    return (
        <div className='dashboardnav'>
            {loading ? (
                <p>Loading Content...</p>
            ) : (
                <>
                    <div className='sidenavtop'>
                        <div className='tagcontainer'>
                            <h1 className='dashboardheader'>Polaris V2</h1>
                            <div className='tag'>
                                <p className='tagtext'>PLUS</p>
                            </div>
                        </div>
                        <img
                            className='toplogout'
                            src='https://cdn.polarlab.app/src/icons/colorless/log-out.png'
                            alt='navImg'></img>
                    </div>
                    <div className='sidenavselection'>
                        <div
                            className={styles.dropdown}
                            onClick={() => {
                                if (!openStatus) {
                                    setOpenStatus(true);
                                } else {
                                    setOpenStatus(false);
                                }
                            }}>
                            {' '}
                            <p className={styles.dropdownselector}>
                                {selectedGuild ? selectedGuild.name : 'Select a Guild'}
                                <img
                                    alt='dropdownArrow'
                                    src='https://cdn.polarlab.app/src/docs/img/rightarrow.png'
                                    className={openStatus ? styles.dropdownimghidden : styles.dropdownimg}
                                    onClick={() => setOpenStatus(!openStatus)}></img>
                            </p>
                            {openStatus && (
                                <ul
                                    className={
                                        openStatus
                                            ? styles.dropdownoptions
                                            : `${styles.dropdownoptions} ${styles.dropdownhidden}`
                                    }>
                                    {guilds.map((guild) => (
                                        <li
                                            key={guild.id}
                                            className={styles.dropdownoption}
                                            onClick={() => {
                                                setSelectedGuild(guild);
                                                setOpenStatus(false);
                                            }}>
                                            {guild.icon && (
                                                <img
                                                    src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                                                    alt={`${guild.name} icon`}
                                                    style={{ marginRight: '10px' }}
                                                />
                                            )}
                                            {guild.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className='navsection'>
                            <Link className='navsectionitem' href='/dashboard'>
                                <img
                                    alt='navImg'
                                    className='navsectionimg'
                                    src='https://cdn.polarlab.app/src/icons/colorless/settings.png'></img>
                                <p className='navsectiontext'>Overview</p>
                            </Link>
                            <Link className='navsectionitem' href='/dashboard/settings'>
                                <img
                                    alt='navImg'
                                    className='navsectionimg'
                                    src='https://cdn.polarlab.app/src/icons/colorless/settings.png'></img>
                                <p className='navsectiontext'>Settings</p>
                            </Link>
                            <Link className='navsectionitem' href='/'>
                                <img
                                    alt='navImg'
                                    className='navsectionimg'
                                    src='https://cdn.polarlab.app/src/icons/colorless/settings.png'></img>
                                <p className='navsectiontext'>Subscription</p>
                            </Link>
                        </div>
                        <div className='navsection'>
                            <p className='navsectionheader'>ENGAGEMENT</p>
                            <Link className='navsectionitem' href='/'>
                                <img
                                    alt='navImg'
                                    className='navsectionimg'
                                    src='https://cdn.polarlab.app/src/icons/colorless/settings.png'></img>
                                <p className='navsectiontext'>EXP & Levels</p>
                            </Link>
                            <Link className='navsectionitem' href='/'>
                                <img
                                    alt='navImg'
                                    className='navsectionimg'
                                    src='https://cdn.polarlab.app/src/icons/colorless/settings.png'></img>
                                <p className='navsectiontext'>Music</p>
                            </Link>
                            <Link className='navsectionitem' href='/'>
                                <img
                                    alt='navImg'
                                    className='navsectionimg'
                                    src='https://cdn.polarlab.app/src/icons/colorless/settings.png'></img>
                                <p className='navsectiontext'>Giveaways</p>
                            </Link>
                            <Link className='navsectionitem' href='/'>
                                <img
                                    alt='navImg'
                                    className='navsectionimg'
                                    src='https://cdn.polarlab.app/src/icons/colorless/settings.png'></img>
                                <p className='navsectiontext'>Birthdays</p>
                            </Link>
                            <Link className='navsectionitem' href='/'>
                                <img
                                    alt='navImg'
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
            )}
        </div>
    );
}
