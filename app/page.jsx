'use client';

import { useEffect } from 'react';
import '@src/global.css';
import Link from 'next/link';
import GridItem from '@/components/main/gridItem';

export default function Home() {
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
                        <GridItem format='full' type='landing-polaris' />
                        <GridItem format='twothirds' type='landing-polarmc' />
                        <GridItem format='third' type='landing-gdk' />
                    </div>
                </div>
            </div>
        </>
    );
}
