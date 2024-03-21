'use client';

import Link from 'next/link';
import '../../src/css/landingPage.css';
import { useEffect } from 'react';
import $ from 'jquery';

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
            <div className='stars'></div>;
            <div className='main'>
                <div className='topsection'>
                    <h1
                        className='websiteheader'
                        initial={{ opacity: 0, x: '-100%' }}
                        animate={{ opacity: 1, x: '0' }}
                        transition={{ duration: 0.8, type: 'spring' }}>
                        Polar MC
                    </h1>
                    <h2
                        className='subheader'
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: '0' }}
                        transition={{ duration: 0.9, type: 'spring' }}>
                        The survival minecraft server that you dreamed of
                    </h2>
                    <Link href='/polarmc#why-polarmc' className='gdkredirect'>
                        Check It Out
                    </Link>
                    <p className='scroll'>Scroll</p>
                </div>
                <div className='sitesection' id='why-polarmc'>
                    <div className='siteheading'>
                        <h2 className='sectionheaderwrapper'>
                            <span className='sectionheader'>Why Polar MC?</span>
                        </h2>
                        <p className='sectionsubheader'>What makes Polar MC special over other servers?</p>
                    </div>
                    <div className='featuregrid'>
                        <div className='griditem gridrowhalf'>
                            <div className='gridtextcontainer'>
                                <h4 className='gridheader'>Community</h4>
                                <p className='gridcontent'>
                                    <span>
                                        Polar MC and other Polar Lab projects are bound together by a very friendly and
                                        welcoming community. We will welcome you no matter your age, gender, race or
                                        anything else! Anyone can play with us and feel like with friends.
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
                        <div className='griditem gridrowhalf'>
                            <div className='gridtextcontainer'>
                                <h4 className='gridheader'>Compatibility</h4>
                                <p className='gridcontent'>
                                    <span>
                                        Want to play your favorite survival server when you&apos;re not at home? No
                                        problem! You can join PolarMC from your mobile devices and bind your accounts,
                                        so you can proceed wherever you left off. You can also join Polar MC without
                                        having a minecraft Java account at all! All bedrock, console and mobile players
                                        welcome!
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
                <div className='sitesection' id='services section1'>
                    <div className='siteheading'>
                        <h2 className='sectionheaderwrapper'>
                            <span className='sectionheader'>The World</span>
                        </h2>
                        <p className='sectionsubheader'>This is everything that the Polar MC world offers</p>
                    </div>
                    <div className='featuregrid'>
                        <div className='griditem gridrowtwothirds'>
                            <div className='gridtextcontainer'>
                                <h4 className='gridheader'>Live Map</h4>
                                <p className='gridcontent'>
                                    <span>
                                        Polar MC offers a live map that contains both a flat and 3D view of the world.
                                        This is map is always updated within 5 minutes of any change being made in the
                                        world. You can also see all your friends on the map or find cool places to make
                                        your base! This map also respects players choices, offering the option to
                                        opt-out of being seen on the map.
                                    </span>
                                </p>
                                <Link className='gridbutton' href='map.polarlab.app'>
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
                                <h4 className='gridheader'>Massive pregenerated world</h4>
                                <p className='gridcontent'>
                                    <span>
                                        On Polar MC, we have a massive 14000x14000 block world. This whole world has
                                        been prerendered on the map, as well as in minecraft, giving you a 20TPS lag
                                        free experience while exploring!{' '}
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
                                <h4 className='gridheader'>Custom Biomes</h4>
                                <p className='gridcontent'>
                                    <span>
                                        Our whole world is covered by custom vanilla+ biomes and structures that all
                                        have something special to them. Let that be loot, a stunning landscape or an
                                        unforgettable adventure!
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
                        <div className='griditem gridrowtwothirds'>
                            <div className='gridtextcontainer'>
                                <h4 className='gridheader'>Vanilla+ World Generation</h4>
                                <p className='gridcontent'>
                                    <span>
                                        Our whole world was generated with a bunch of datapacks providing an interesting
                                        experience whilst maintaining the vanilla feel of minecraft. This includes
                                        custom biomes, overall larger biomes and landmasses, rivers that lead into the
                                        sea and have a consecutive sailable path. The world is an interesting and
                                        mysterious experience underground. Come explore with us!
                                    </span>
                                </p>
                                <Link className='gridbutton' href='map.polarlab.app'>
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
