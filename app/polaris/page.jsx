'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import '../../src/css/landingPage.css';

export default function Page() {
    return (
        <>
            <div className='stars'></div>
            <div className='main'>
                <div className='sitesection topsection '>
                    <motion.h1
                        className='websiteheader'
                        initial={{ opacity: 0, x: '-100%' }}
                        animate={{ opacity: 1, x: '0' }}
                        transition={{ duration: 0.8, type: 'spring' }}>
                        Polaris V2
                    </motion.h1>
                    <motion.h2
                        className='subheader'
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: '0' }}
                        transition={{ duration: 0.9, type: 'spring' }}>
                        One Bot To Rule Them All, One Bot To Surpass Them All
                    </motion.h2>
                    <motion.a
                        className='gdkredirect'
                        href='/polarmc#whypolarmc'
                        initial={{ opacity: 0, x: '-100%' }}
                        animate={{ opacity: ``, x: '0' }}
                        transition={{ duration: 1, type: 'spring' }}>
                        Check it out
                    </motion.a>
                    <p className='scroll'>Scroll</p>
                </div>
                <div className='sitesection' id='whypolarmc'>
                    <h2 className='sectionheaderwrapper'>
                        <span className='sectionheader'>Why Polaris?</span>
                    </h2>
                    <p className='sectionsubheader'>Why should you choose Polaris V2 for your server?</p>
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
                                className='gridimg'
                                src='https://cdn.discordapp.com/attachments/1018171583111647313/1162688572718055464/thirdtestactual.png?ex=653cd91d&is=652a641d&hm=bdd165761beb9cacddaac15d20ab3f9af3a58c92fd2681e963b219845c36d3e1&'
                            />
                        </div>
                        <div className='griditem gridrowthird'>
                            <div className='gridtextcontainer'>
                                <h4 className='gridheader'>Accessible</h4>
                                <p className='gridcontent'>
                                    <span>
                                        Didn't find what you were looking for in Polaris? No problem! You can request it
                                        be made, or make it directly yourself! Due to the FOSS nature of Polaris we
                                        allow developers to make their own modules to be officially integrated into
                                        Polaris for anyone to use!
                                    </span>
                                </p>
                                <Link className='gridbutton' href='/polaris'>
                                    Check It Out
                                </Link>
                            </div>
                            <img
                                className='gridimg'
                                src='https://cdn.discordapp.com/attachments/1018171583111647313/1162688572718055464/thirdtestactual.png?ex=653cd91d&is=652a641d&hm=bdd165761beb9cacddaac15d20ab3f9af3a58c92fd2681e963b219845c36d3e1&'
                            />
                        </div>
                        <div className='griditem gridrowthird'>
                            <div className='gridtextcontainer'>
                                <h4 className='gridheader'>Web Dashboard</h4>
                                <p className='gridcontent'>
                                    <span>
                                        Polaris offers a full scale web dahboard for you to manage your servers in. This
                                        dashboard allows you to control everything inside your server and modules.
                                    </span>
                                </p>
                                <Link className='gridbutton' href='/polaris'>
                                    Check It Out
                                </Link>
                            </div>
                            <img
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
                                className='gridimg'
                                src='https://cdn.discordapp.com/attachments/1018171583111647313/1162688572718055464/thirdtestactual.png?ex=653cd91d&is=652a641d&hm=bdd165761beb9cacddaac15d20ab3f9af3a58c92fd2681e963b219845c36d3e1&'
                            />
                        </div>
                    </div>
                </div>
                <div className='sitesection' id='services section1'>
                    <h2 className='sectionheaderwrapper'>
                        <span className='sectionheader'>The World</span>
                    </h2>
                    <p className='sectionsubheader'>This is everything that the Polar MC world offers</p>
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
