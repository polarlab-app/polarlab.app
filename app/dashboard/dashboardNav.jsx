'use client';

import styles from '@css/dashboard/nav.module.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import getGuilds from '@lib/dashboard/getGuilds';
import findUser from '@/lib/personal/findUser';
import styles2 from '@css/dashboard/navdropdown.module.css';
import { useGuild } from './guildContext';
import Image from 'next/image';
import logout from '@/lib/auth/sessionManagement/logout';

const NavLink = ({ activeNav, setActiveNav, children }) => {
    const i = {
        overview: 'icon-grid-2',
        settings: 'icon-gear',
        subscription: 'icon-sparkles',
        'exp & levels': 'icon-stars',
        music: 'icon-music',
        giveaways: 'icon-gift',
        birthdays: 'icon-cake',
        'social notifications': 'icon-bells',
        moderation: 'icon-shield',
        logging: 'icon-scroll',
        'auto moderator': 'icon-shield',
        'server guard': 'icon-shield-keyhole',
    };

    return (
        <Link
            className={`${styles.navsectionitem} ${activeNav === children ? styles.active : ''}`}
            href={'/dashboard/' + children.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}
            onClick={() => setActiveNav(children)}
        >
            <i alt='navImg' className={`${styles.navsectionimg} ${i[children.toLowerCase()]}`} />
            <p className={styles.navsectiontext}>{children}</p>
        </Link>
    );
};

export default function DashboardNav() {
    const [guilds, setGuilds] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openStatus, setOpenStatus] = useState(false);
    const [activeNav, setActiveNav] = useState(null);
    const [user, setUser] = useState(null);
    const { selectedGuild, setSelectedGuild } = useGuild();

    useEffect(() => {
        async function fetchGuilds() {
            const guildList = JSON.parse(await getGuilds());
            const user = JSON.parse(await findUser());
            setUser(user);
            setGuilds(guildList);
            setLoading(false);
            if (guildList && guildList.length > 0) {
                setSelectedGuild(guildList[0]);
            }
        }
        fetchGuilds();
    }, [setSelectedGuild]);

    async function handleLogout() {
        const res = await logout();
        if (res) {
            window.location.href = '/login';
        }
    }

    return (
        <div className={styles.dashboardnav}>
            {loading ? (
                <p>Loading Content...</p>
            ) : (
                <>
                    <div className={`${styles.sidenavtop} ${openStatus ? styles.active : null}`}>
                        <div className={styles.dropdown} onClick={() => setOpenStatus(!openStatus)}>
                            <Image
                                alt='icon'
                                src={`https://cdn.polarlab.app/api/fetch/users/avatars/${user.id}/webp`}
                                width={128}
                                height={128}
                                className={styles.profileIcon}
                            />
                            <div className={styles.textContainer}>
                                <p className={`${styles.guild} ${styles.dropDownSelector}`}>
                                    {selectedGuild ? selectedGuild.name : 'Select a Guild'}
                                </p>
                                <p className={styles.username}>{user.username}</p>
                            </div>
                        </div>
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
                                        {guild.icon != null ? (
                                            <Image
                                                width={128}
                                                height={128}
                                                src={guild.icon}
                                                alt={`<i>`}
                                                className={styles2.icon}
                                            />
                                        ) : (
                                            <Image
                                                width={12}
                                                height={12}
                                                src={`https://placehold.co/128x128`}
                                                alt={`<i2>`}
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
                                    window.location.href = process.env.GUILD_INSTALL_URI;
                                }}
                            >
                                Add Server...
                            </li>
                        </ul>
                    </div>
                    <div className={styles.sidenavselection}>
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
                        <button className={styles.button} onClick={() => handleLogout()}>
                            Log Out
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
