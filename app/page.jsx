'use client';

import { useEffect } from 'react';
import '../src/global.css';
import '../src/css/landingPage.css';
import Link from 'next/link';

import $ from 'jquery';

export default function Home() {
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
                <div className='topsection'>
                    <h1 className='websiteheader'>Polar Lab</h1>
                    <h2 className='subheader'>Free and open source services to enliven your online experience</h2>
                    <a className='gdkredirect' href='#services'>
                        Check it out
                    </a>
                    <p className='scroll'>Scroll</p>
                </div>
                <div className='sitesection' id='services section1'>
                    <div className='siteheading'>
                        <h2 className='sectionheaderwrapper'>
                            <span className='sectionheader'>Our Services</span>
                        </h2>
                        <p className='sectionsubheader'>A summary of the services we offer</p>
                    </div>

                    <div className='featuregrid'>
                        <div className='griditem gridrowfull'>
                            <div className='gridtextcontainer'>
                                <h4 className='gridheader'>Polaris V2</h4>
                                <p className='gridcontent'>
                                    <span>
                                        Elevate your Discord experience with weekly updates, an intuitive web dashboard,
                                        comprehensive documentation, and a commitment to reliability. Join our public
                                        test beta, and be a part of shaping the future of this dynamic Discord bot!
                                    </span>
                                </p>
                                <Link className='gridbutton' href='/polaris' prefetch={false}>
                                    Check It Out
                                </Link>
                            </div>
                            <img
                                alt='gridimg'
                                className='gridimg'
                                src='https://cdn.discordapp.com/attachments/1018171583111647313/1162688572718055464/thirdtestactual.png?ex=653cd91d&is=652a641d&hm=bdd165761beb9cacddaac15d20ab3f9af3a58c92fd2681e963b219845c36d3e1&'
                            />
                        </div>
                        <div className='griditem gridrowthird '>
                            <div className='gridtextcontainer'>
                                <h4 className='gridheader'>Polar MC</h4>
                                <p className='gridcontent'>
                                    <span>
                                        Come join us in a journey of creating a welcoming minecraft community and take
                                        part in creating a dynamic world full of beautiful builds and gorgeous custom
                                        landscapes!
                                    </span>
                                </p>
                                <Link className='gridbutton' href='/polarmc' prefetch={false}>
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
                                <h4 className='gridheader'>Glorious Development Kit</h4>
                                <p className='gridcontent'>
                                    <span>
                                        A comprehensive toolkit designed for developers and designers. It offers a wide
                                        array of resources, including extensive color palettes, versatile generators and
                                        more!
                                    </span>
                                </p>
                                <Link className='gridbutton' href='/gdk' prefetch={false}>
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
