'use client';

import styles from '@css/dashboard/nav.module.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import getGuilds from '@lib/dashboard/getGuilds';
import styles2 from '@css/dashboard/navdropdown.module.css';
import Image from 'next/image';
import { useGuild } from './guildContext';

export default function DashboardNav() {
    const [guilds, setGuilds] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openStatus, setOpenStatus] = useState(false);
    const { selectedGuild, setSelectedGuild } = useGuild();

    useEffect(() => {
        async function fetchGuilds() {
            const guildList = await getGuilds();
            setGuilds(guildList);
            setLoading(false);
            if (guildList && guildList.length > 0) {
                setSelectedGuild(guildList[0]);
            }
        }
        fetchGuilds();
    }, [setSelectedGuild]);

    return (
        <div className={styles.dashboardnav}>
            {loading ? (
                <p>Loading Content...</p>
            ) : (
                <>
                    <div className={styles.sidenavtop}>
                        <div className={styles.tagcontainer}>
                            <h1 className={styles.dashboardheader}>Polaris V2</h1>
                            <div className={styles.tag}>
                                <p className={styles.tagtext}>PLUS</p>
                            </div>
                        </div>
                        <img
                            className={styles.toplogout}
                            src='https://cdn.polarlab.app/src/icons/colorless/log-out.png'
                            alt='navImg'></img>
                    </div>
                    <div className={styles.sidenavselection}>
                        <div className={styles2.dropdown} onClick={() => setOpenStatus(!openStatus)}>
                            <p className={styles2.dropdownselector}>
                                {selectedGuild ? selectedGuild.name : 'Select a Guild'}
                                <img
                                    alt='dropdownArrow'
                                    src='https://cdn.polarlab.app/src/docs/img/rightarrow.png'
                                    className={openStatus ? styles2.dropdownimghidden : styles2.dropdownimg}
                                    onClick={() => setOpenStatus(!openStatus)}></img>
                            </p>
                            <ul
                                className={
                                    openStatus
                                        ? styles2.dropdownoptions
                                        : `${styles2.dropdownoptions} ${styles2.dropdownhidden}`
                                }>
                                {guilds.map((guild) => (
                                    <li
                                        key={guild.id}
                                        className={styles2.dropdownoption}
                                        onClick={() => {
                                            setSelectedGuild(guild);
                                            setOpenStatus(false);
                                        }}>
                                        {guild.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={styles.navsection}>
                            <Link className={styles.navsectionitem} href='/dashboard'>
                                <img
                                    alt='navImg'
                                    className={styles.navsectionimg}
                                    src='https://cdn.polarlab.app/src/icons/colorless/settings.png'></img>
                                <p className={styles.navsectiontext}>Overview</p>
                            </Link>
                            <Link className={styles.navsectionitem} href='/dashboard/settings'>
                                <img
                                    alt='navImg'
                                    className={styles.navsectionimg}
                                    src='https://cdn.polarlab.app/src/icons/colorless/settings.png'></img>
                                <p className={styles.navsectiontext}>Settings</p>
                            </Link>
                            <Link className={styles.navsectionitem} href='/'>
                                <img
                                    alt='navImg'
                                    className={styles.navsectionimg}
                                    src='https://cdn.polarlab.app/src/icons/colorless/settings.png'></img>
                                <p className={styles.navsectiontext}>Subscription</p>
                            </Link>
                        </div>
                        <div className={styles.navsection}>
                            <p className={styles.navsectionheader}>ENGAGEMENT</p>
                            <Link className={styles.navsectionitem} href='/'>
                                <img
                                    alt='navImg'
                                    className={styles.navsectionimg}
                                    src='https://cdn.polarlab.app/src/icons/colorless/settings.png'></img>
                                <p className={styles.navsectiontext}>EXP & Levels</p>
                            </Link>
                            <Link className={styles.navsectionitem} href='/'>
                                <img
                                    alt='navImg'
                                    className={styles.navsectionimg}
                                    src='https://cdn.polarlab.app/src/icons/colorless/settings.png'></img>
                                <p className={styles.navsectiontext}>Music</p>
                            </Link>
                            <Link className={styles.navsectionitem} href='/'>
                                <img
                                    alt='navImg'
                                    className={styles.navsectionimg}
                                    src='https://cdn.polarlab.app/src/icons/colorless/settings.png'></img>
                                <p className={styles.navsectiontext}>Giveaways</p>
                            </Link>
                            <Link className={styles.navsectionitem} href='/'>
                                <img
                                    alt='navImg'
                                    className={styles.navsectionimg}
                                    src='https://cdn.polarlab.app/src/icons/colorless/settings.png'></img>
                                <p className={styles.navsectiontext}>Birthdays</p>
                            </Link>
                            <Link className={styles.navsectionitem} href='/'>
                                <img
                                    alt='navImg'
                                    className={styles.navsectionimg}
                                    src='https://cdn.polarlab.app/src/icons/colorless/settings.png'></img>
                                <p className={styles.navsectiontext}>Social Notifications</p>
                            </Link>
                        </div>
                    </div>
                    <div className={styles.sidenavbottom}>
                        <Link className={styles.logout} href='/dashboard/login/logout'>
                            Log Out
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}
