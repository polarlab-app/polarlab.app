'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import '../src/css/landingPage.css';

export default function Home() {
    return (
        <>
            <div className='stars'></div>
            <div className='main'>
                <div className='topsection'>
                    <motion.h1
                        className='websiteheader'
                        initial={{ opacity: 0, x: '-100%' }}
                        animate={{ opacity: 1, x: '0' }}
                        transition={{ duration: 0.8, type: 'spring' }}>
                        Polar Lab Projects
                    </motion.h1>
                    <motion.h2
                        className='subheader'
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: '0' }}
                        transition={{ duration: 0.9, type: 'spring' }}>
                        Projects that will enliven your online experience
                    </motion.h2>
                    <motion.a
                        className='gdkredirect'
                        href='#services'
                        initial={{ opacity: 0, x: '-100%' }}
                        animate={{ opacity: ``, x: '0' }}
                        transition={{ duration: 1, type: 'spring' }}>
                        Check it out
                    </motion.a>
                    <p className='scroll'>Scroll</p>
                </div>
                <div className='sitesection' id='services section1'>
                    <h2 className='sectionheaderwrapper'>
                        <span className='sectionheader'>Our Services</span>
                    </h2>
                    <p className='sectionsubheader'>A small part of the services we provide</p>
                    <div className='featuregrid'>
                        <motion.div className='griditem gridrowfull'>
                            <div className='gridtextcontainer'>
                                <h4 className='gridheader'>Polaris V2</h4>
                                <p className='gridcontent'>
                                    <span>
                                        Elevate your Discord experience with weekly updates, an intuitive web dashboard,
                                        comprehensive documentation, and a commitment to reliability. Join our public
                                        test beta, and be a part of shaping the future of this dynamic Discord bot!
                                    </span>
                                </p>
                                <a className='gridbutton' href=''>
                                    Check It Out
                                </a>
                            </div>
                            <img
                                className='gridimg'
                                src='https://cdn.discordapp.com/attachments/1018171583111647313/1162688572718055464/thirdtestactual.png?ex=653cd91d&is=652a641d&hm=bdd165761beb9cacddaac15d20ab3f9af3a58c92fd2681e963b219845c36d3e1&'
                            />
                        </motion.div>
                        <motion.div className='griditem gridrowthird '>
                            <div className='gridtextcontainer'>
                                <h4 className='gridheader'>Polar MC</h4>
                                <p className='gridcontent'>
                                    <span>
                                        Elevate your Discord experience with weekly updates, an intuitive web dashboard,
                                        comprehensive documentation, and a commitment to reliability. Join our public
                                        test beta, and be a part of shaping the future of this dynamic Discord bot!
                                    </span>
                                </p>
                                <a className='gridbutton' href=''>
                                    Check It Out
                                </a>
                            </div>
                            <img
                                className='gridimg'
                                src='https://cdn.discordapp.com/attachments/1018171583111647313/1162688572718055464/thirdtestactual.png?ex=653cd91d&is=652a641d&hm=bdd165761beb9cacddaac15d20ab3f9af3a58c92fd2681e963b219845c36d3e1&'
                            />
                        </motion.div>
                        <motion.div className='griditem gridrowtwothirds'>
                            <div className='gridtextcontainer'>
                                <h4 className='gridheader'>Glorious Development Kit</h4>
                                <p className='gridcontent'>
                                    <span>
                                        A comprehensive toolkit designed for developers and designers. It offers a wide
                                        array of resources, including extensive color palettes, versatile generators and
                                        more!
                                    </span>
                                </p>
                                <a className='gridbutton'>Check It Out</a>
                            </div>
                            <img
                                className='gridimg'
                                src='https://cdn.discordapp.com/attachments/1018171583111647313/1162688572718055464/thirdtestactual.png?ex=653cd91d&is=652a641d&hm=bdd165761beb9cacddaac15d20ab3f9af3a58c92fd2681e963b219845c36d3e1&'
                            />
                        </motion.div>
                    </div>
                </div>
                <div className='sitesection' id='section2'>
                    <h2 className='sectionheader '>Our Services</h2>
                    <p className='sectionsubheader '>A small part of the services we provide</p>
                    <div className='featuregrid'>
                        <motion.div className='griditem gridrowhalf '>
                            <div className='gridtextcontainer'>
                                <h4 className='gridheader'>Glorious Development Kit</h4>
                                <p className='gridcontent'>
                                    <span>
                                        A comprehensive toolkit designed for developers and designers. It offers a wide
                                        array of resources, including extensive color palettes, versatile generators and
                                        more!
                                    </span>
                                </p>
                                <a className='gridbutton'>Check It Out</a>
                            </div>
                            <img
                                className='gridimg'
                                src='https://cdn.discordapp.com/attachments/1018171583111647313/1162688572718055464/thirdtestactual.png?ex=653cd91d&is=652a641d&hm=bdd165761beb9cacddaac15d20ab3f9af3a58c92fd2681e963b219845c36d3e1&'
                            />
                        </motion.div>
                        <motion.div className='griditem gridrowhalf '>
                            <div className='gridtextcontainer'>
                                <h4 className='gridheader'>Glorious Development Kit</h4>
                                <p className='gridcontent'>
                                    <span>
                                        A comprehensive toolkit designed for developers and designers. It offers a wide
                                        array of resources, including extensive color palettes, versatile generators and
                                        more!
                                    </span>
                                </p>
                                <a className='gridbutton'>Check It Out</a>
                            </div>
                            <img
                                className='gridimg'
                                src='https://cdn.discordapp.com/attachments/1018171583111647313/1162688572718055464/thirdtestactual.png?ex=653cd91d&is=652a641d&hm=bdd165761beb9cacddaac15d20ab3f9af3a58c92fd2681e963b219845c36d3e1&'
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
}