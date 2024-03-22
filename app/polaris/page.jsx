'use client';

import Link from 'next/link';
import '../../src/css/landingPage.css';
import { useEffect } from 'react';
import $ from 'jquery';

/*export const metadata = {
    title: 'Polaris V2',
    description: 'One bot to rule them all, one bot to surpass them all',
};*/

export default function Page() {
    useEffect(() => {
        const checkVisibility = () => {
            $('.griditem, .siteheading').each(function () {
                const elementTop = $(this).offset().top;
                const windowTop = $(window).scrollTop();
                const windowHeight = $(window).height();

                if (elementTop < windowTop + windowHeight * 0.9) {
                    $(this).addClass('animate');
                } else {
                    $(this).removeClass('animate');
                }
            });
        };

        $(window).on('scroll', checkVisibility);

        return () => {
            $(window).off('scroll', checkVisibility);
        };
    }, []);

    return (
        <>
            <div className='stars'></div>
            <div className='main'>
                <div className='sitesection topsection '>
                    <h1 className='websiteheader'>Polaris V2</h1>
                    <h2 className='subheader'>One Bot To Rule Them All, One Bot To Surpass Them All</h2>
                    <Link href='/polaris#why-polaris' className='gdkredirect'>
                        Check It Out
                    </Link>
                    <p className='scroll'>Scroll</p>
                </div>
                <div className='sitesection' id='why-polaris'>
                    <div className='siteheading'>
                        <h2 className='sectionheaderwrapper'>
                            <span className='sectionheader'>Why Polaris?</span>
                        </h2>
                        <p className='sectionsubheader'>Why should you choose Polaris V2 for your server?</p>
                    </div>

                    <div className='featuregrid'>
                        <div className='griditem gridrowthird'>
                            <div className='gridtextcontainer'>
                                <h4 className='gridheader'>Free</h4>
                                <p className='gridcontent'>
                                    <span>
                                        Polaris is completely free! From the actual bot across hosting right up to the
                                        dashboard! Nothing is paywall locked and is accessible to anyone!
                                    </span>
                                </p>
                                <Link className='gridbutton' href='/polaris'>
                                    Check It Out
                                </Link>
                            </div>
                            <img
                                alt='gridimg'
                                className='gridimg'
                                src='https://cdn.discordapp.com/attachments/1018171583111647313/1162688572718055464/thirdtestactual.png?ex=653cd91d&is=652a641d&hm=bdd165761beb9cacddaac15d20ab3f9af3a58c92fd2681e963b219845c36d3e1&'
                            />
                        </div>
                        <div className='griditem gridrowthird'>
                            <div className='gridtextcontainer'>
                                <h4 className='gridheader'>Open Source</h4>
                                <p className='gridcontent'>
                                    <span>
                                        Polaris is completely open source, meaning anyone can browse through and use our
                                        code. This pretty much guarantees that you are being offered a genuine, secure
                                        and privacy focused experience.
                                    </span>
                                </p>
                                <Link className='gridbutton' href='/polaris'>
                                    Check It Out
                                </Link>
                            </div>
                            <img
                                alt='gridimg'
                                className='gridimg'
                                src='https://cdn.discordapp.com/attachments/1018171583111647313/1162688572718055464/thirdtestactual.png?ex=653cd91d&is=652a641d&hm=bdd165761beb9cacddaac15d20ab3f9af3a58c92fd2681e963b219845c36d3e1&'
                            />
                        </div>
                        <div className='griditem gridrowthird'>
                            <div className='gridtextcontainer'>
                                <h4 className='gridheader'>Accessible</h4>
                                <p className='gridcontent'>
                                    <span>
                                        Didn&apos;t find what you were looking for in Polaris? No problem! You can
                                        request it be made, or make it directly yourself! Due to the FOSS nature of
                                        Polaris we allow developers to make their own modules to be officially
                                        integrated into Polaris for anyone to use!
                                    </span>
                                </p>
                                <Link className='gridbutton' href='/polaris'>
                                    Check It Out
                                </Link>
                            </div>
                            <img
                                alt='gridimg'
                                className='gridimg'
                                src='https://cdn.discordapp.com/attachments/1018171583111647313/1162688572718055464/thirdtestactual.png?ex=653cd91d&is=652a641d&hm=bdd165761beb9cacddaac15d20ab3f9af3a58c92fd2681e963b219845c36d3e1&'
                            />
                        </div>
                        <div className='griditem gridrowthird'>
                            <div className='gridtextcontainer'>
                                <h4 className='gridheader'>Web Dashboard</h4>
                                <p className='gridcontent'>
                                    <span>
                                        Polaris offers a full scale web dashboard for you to manage your servers in.
                                        This dashboard allows you to control everything inside your server and modules.
                                    </span>
                                </p>
                                <Link className='gridbutton' href='/polaris'>
                                    Check It Out
                                </Link>
                            </div>
                            <img
                                alt='gridimg'
                                className='gridimg'
                                src='https://cdn.discordapp.com/attachments/1018171583111647313/1162688572718055464/thirdtestactual.png?ex=653cd91d&is=652a641d&hm=bdd165761beb9cacddaac15d20ab3f9af3a58c92fd2681e963b219845c36d3e1&'
                            />
                        </div>
                        <div className='griditem gridrowthird'>
                            <div className='gridtextcontainer'>
                                <h4 className='gridheader'>Ease Of Use</h4>
                                <p className='gridcontent'>
                                    <span>
                                        Polaris is very easy to use. So easy actually, that you can set it up using your
                                        phone, and just discord. The web dashboard is an optional management panel for
                                        pc users, but the bot can be fully set up and managed from your mobile device.
                                    </span>
                                </p>
                                <Link className='gridbutton' href='/polaris'>
                                    Check It Out
                                </Link>
                            </div>
                            <img
                                alt='gridimg'
                                className='gridimg'
                                src='https://cdn.discordapp.com/attachments/1018171583111647313/1162688572718055464/thirdtestactual.png?ex=653cd91d&is=652a641d&hm=bdd165761beb9cacddaac15d20ab3f9af3a58c92fd2681e963b219845c36d3e1&'
                            />
                        </div>
                        <div className='griditem gridrowthird'>
                            <div className='gridtextcontainer'>
                                <h4 className='gridheader'>Professional Execution</h4>
                                <p className='gridcontent'>
                                    <span>
                                        Polaris was made with everything in mind, including 60+ commands, 20+ individual
                                        events that can be setup. This massive suite of features is ready to be used at
                                        your will for free, easily and quickly.
                                    </span>
                                </p>
                                <Link className='gridbutton' href='/polaris'>
                                    Check It Out
                                </Link>
                            </div>
                            <img
                                alt='gridimg'
                                className='gridimg'
                                src='https://cdn.discordapp.com/attachments/1018171583111647313/1162688572718055464/thirdtestactual.png?ex=653cd91d&is=652a641d&hm=bdd165761beb9cacddaac15d20ab3f9af3a58c92fd2681e963b219845c36d3e1&'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
