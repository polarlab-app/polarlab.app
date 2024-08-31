'use client';

import styles from '@css/dashboard/nav.module.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import getGuilds from '@lib/dashboard/getGuilds';
import styles2 from '@css/dashboard/navdropdown.module.css';
import { useGuild } from './guildContext';
import Image from 'next/image';

const NavLink = ({ activeNav, setActiveNav, children }) => (
    <Link
        className={`${styles.navsectionitem} ${activeNav === children ? styles.active : ''}`}
        href={children.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}
        onClick={() => setActiveNav(children)}
    >
        <i alt='navImg' className={`${styles.navsectionimg} icon-grid-2`} />
        <p className={styles.navsectiontext}>{children}</p>
    </Link>
);

export default function DashboardNav() {
    const [guilds, setGuilds] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openStatus, setOpenStatus] = useState(false);
    const [activeNav, setActiveNav] = useState(null);
    const { selectedGuild, setSelectedGuild } = useGuild();

    useEffect(() => {
        async function fetchGuilds() {
            const guildList = JSON.parse(await getGuilds());
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
                            alt='navImg'
                        ></img>
                    </div>
                    <div className={styles.sidenavselection}>
                        <div className={styles2.dropdown} onClick={() => setOpenStatus(!openStatus)}>
                            <p className={styles2.dropdownselector}>
                                {selectedGuild ? selectedGuild.name : 'Select a Guild'}
                                <img
                                    alt='dropdownArrow'
                                    src='https://cdn.polarlab.app/src/docs/img/rightarrow.png'
                                    className={openStatus ? styles2.dropdownimghidden : styles2.dropdownimg}
                                    onClick={() => setOpenStatus(!openStatus)}
                                ></img>
                            </p>
                            <ul
                                className={
                                    openStatus
                                        ? styles2.dropdownoptions
                                        : `${styles2.dropdownoptions} ${styles2.dropdownhidden}`
                                }
                            >
                                {guilds ? (
                                    guilds.map((guild) => (
                                        <li
                                            key={guild.id}
                                            className={styles2.dropdownoption}
                                            onClick={() => {
                                                setSelectedGuild(guild);
                                                setOpenStatus(false);
                                            }}
                                        >
                                            {guild.icon ? (
                                                <Image
                                                    width={128}
                                                    height={128}
                                                    src={guild.icon}
                                                    alt={`<i>`}
                                                    className={styles2.icon}
                                                />
                                            ) : (
                                                <Image
                                                    width={128}
                                                    height={128}
                                                    src={`https://placehold.co/128x128`}
                                                    alt={`<i>`}
                                                    className={styles2.icon}
                                                    unoptimized
                                                />
                                            )}
                                            {guild.name}
                                        </li>
                                    ))
                                ) : (
                                    <p>Loading guilds...</p>
                                )}
                                <li
                                    className={styles2.dropdownoption}
                                    onClick={() => {
                                        window.location.href =
                                            'https://discord.com/oauth2/authorize?client_id=1065350226757554237&permissions=8&response_type=code&redirect_uri=https%3A%2F%2Flocalhost%3A3000%2Flogin%2Fcallback&integration_type=0&scope=identify+guilds+bot';
                                    }}
                                >
                                    Add Server...
                                </li>
                            </ul>
                        </div>
                        <div className={styles.navsection}>
                            <NavLink activeNav={activeNav} setActiveNav={setActiveNav}>
                                Overview
                            </NavLink>
                            <NavLink activeNav={activeNav} setActiveNav={setActiveNav}>
                                Settings
                            </NavLink>
                            <NavLink activeNav={activeNav} setActiveNav={setActiveNav}>
                                Subscription
                            </NavLink>
                        </div>
                        <div className={styles.navsection}>
                            <p className={styles.navsectionheader}>ENGAGEMENT</p>
                            <NavLink activeNav={activeNav} setActiveNav={setActiveNav}>
                                EXP & Levels
                            </NavLink>
                            <NavLink activeNav={activeNav} setActiveNav={setActiveNav}>
                                Music
                            </NavLink>
                            <NavLink activeNav={activeNav} setActiveNav={setActiveNav}>
                                Giveaways
                            </NavLink>
                            <NavLink activeNav={activeNav} setActiveNav={setActiveNav}>
                                Birthdays
                            </NavLink>
                            <NavLink activeNav={activeNav} setActiveNav={setActiveNav}>
                                Social Notifications
                            </NavLink>
                        </div>
                        <div className={styles.navsection}>
                            <p className={styles.navsectionheader}>MODERATION</p>
                            <NavLink activeNav={activeNav} setActiveNav={setActiveNav}>
                                Moderation
                            </NavLink>
                            <NavLink activeNav={activeNav} setActiveNav={setActiveNav}>
                                Logging
                            </NavLink>
                            <NavLink activeNav={activeNav} setActiveNav={setActiveNav}>
                                Auto Moderator
                            </NavLink>
                            <NavLink activeNav={activeNav} setActiveNav={setActiveNav}>
                                Server Guard
                            </NavLink>
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
