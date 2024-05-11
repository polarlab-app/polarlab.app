'use client';

import '@css/dashboard/overview.css';
import TopBar from '@/components/dashboard/topbar';
import { useGuild } from './guildContext';
import getGuildData from '@/lib/dashboard/getGuildData';
import { useEffect, useState } from 'react';

export default function Page() {
    const { selectedGuild, setSelectedGuild } = useGuild();
    const [guildData, setGuildData] = useState(null);

    useEffect(() => {
        if (selectedGuild) {
            const fetchGuildData = async () => {
                const data = await getGuildData(selectedGuild.id);
                setGuildData(JSON.parse(data));
            };
            fetchGuildData();
        }
    }, [selectedGuild]);

    return (
        <div className='dashboard'>
            <TopBar type='overview' />
            <div className='dashboardwrapper'>
                <div className='hometop'>
                    <div className='smallinfocard'>
                        <div className='smallinfotextcontainer'>
                            <p className='smallinfoheader'>{guildData ? guildData.data.memberCount : 'Loading'}</p>
                            <p
                                className='smallinfodescription'
                                test='test1'
                                onClick={(e) => console.log(e.target.getAttribute('test'))}>
                                Members in the server
                            </p>
                        </div>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 640 512'
                            fill='#9d9ba9'
                            className='smallinfoimg'>
                            <path d='M224 48a80 80 0 1 1 0 160 80 80 0 1 1 0-160zm0 208A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 96h91.4c65.7 0 120.1 48.7 129 112H49.3c8.9-63.3 63.3-112 129-112zm0-48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3zm431 208c17 0 30.7-13.8 30.7-30.7C640 392.2 567.8 320 478.7 320H417.3c-4.4 0-8.8 .2-13.2 .5c46.4 38.6 75.9 96.7 75.9 161.8c0 10.8-2.8 20.9-7.6 29.7H609.3zM432 256c61.9 0 112-50.1 112-112s-50.1-112-112-112c-24.8 0-47.7 8.1-66.3 21.7C377.4 75.9 384 101.2 384 128c0 35.6-11.6 68.5-31.3 95.1C373 243.4 401 256 432 256z' />
                        </svg>
                    </div>
                    <div className='smallinfocard'>
                        <div className='smallinfotextcontainer'>
                            <p className='smallinfoheader'>12</p>
                            <p className='smallinfodescription'>Members joined in the past 24h</p>
                        </div>
                        <img
                            alt='dashboardImage'
                            className='smallinfoimg'
                            src='https://cdn.discordapp.com/attachments/1018171583111647313/1183143971736801341/Untitled-2.png?ex=65c7dd30&is=65b56830&hm=2ccfa9d152f7a628825a5b0e8b69cbab77c1d390ce9593960d99ee5cb8cabc62&'></img>
                    </div>
                    <div className='smallinfocard'>
                        <div className='smallinfotextcontainer'>
                            <p className='smallinfoheader'>27,890</p>
                            <p className='smallinfodescription'></p>
                        </div>
                        <svg
                            alt='dashboardImage'
                            className='smallinfoimg'
                            width='100%'
                            height='100%'
                            viewBox='0 0 24 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'>
                            <path
                                d='M6.09436 11.2288C6.03221 10.8282 5.99996 10.4179 5.99996 10C5.99996 5.58172 9.60525 2 14.0526 2C18.4999 2 22.1052 5.58172 22.1052 10C22.1052 10.9981 21.9213 11.9535 21.5852 12.8345C21.5154 13.0175 21.4804 13.109 21.4646 13.1804C21.4489 13.2512 21.4428 13.301 21.4411 13.3735C21.4394 13.4466 21.4493 13.5272 21.4692 13.6883L21.8717 16.9585C21.9153 17.3125 21.9371 17.4895 21.8782 17.6182C21.8266 17.731 21.735 17.8205 21.6211 17.8695C21.4911 17.9254 21.3146 17.8995 20.9617 17.8478L17.7765 17.3809C17.6101 17.3565 17.527 17.3443 17.4512 17.3448C17.3763 17.3452 17.3245 17.3507 17.2511 17.3661C17.177 17.3817 17.0823 17.4172 16.893 17.4881C16.0097 17.819 15.0524 18 14.0526 18C13.6344 18 13.2237 17.9683 12.8227 17.9073M7.63158 22C10.5965 22 13 19.5376 13 16.5C13 13.4624 10.5965 11 7.63158 11C4.66668 11 2.26316 13.4624 2.26316 16.5C2.26316 17.1106 2.36028 17.6979 2.53955 18.2467C2.61533 18.4787 2.65322 18.5947 2.66566 18.6739C2.67864 18.7567 2.68091 18.8031 2.67608 18.8867C2.67145 18.9668 2.65141 19.0573 2.61134 19.2383L2 22L4.9948 21.591C5.15827 21.5687 5.24 21.5575 5.31137 21.558C5.38652 21.5585 5.42641 21.5626 5.50011 21.5773C5.5701 21.5912 5.67416 21.6279 5.88227 21.7014C6.43059 21.8949 7.01911 22 7.63158 22Z'
                                stroke='#9d9ba9'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLineJoin='round'
                            />
                        </svg>
                    </div>
                </div>
                <div className='overviewgraphs'></div>
                <div className='overviewdata'></div>
            </div>
        </div>
    );
}
