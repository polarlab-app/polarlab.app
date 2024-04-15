'use client';

import Link from 'next/link';
import GridItem from '@components/main/gridItem';

/*export const metadata = {
    title: 'Polaris V2',
    description: 'One bot to rule them all, one bot to surpass them all',
};*/

export default function Page() {
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
                        <GridItem format='third' type='polaris-landing-freemium' />
                        <GridItem format='third' type='polaris-landing-open-source' />
                        <GridItem format='third' type='polaris-landing-accessible' />
                        <GridItem format='third' type='polaris-landing-web-dashboard' />
                        <GridItem format='third' type='polaris-landing-ease-of-use' />
                        <GridItem format='third' type='polaris-landing-professional-execution' />
                    </div>
                </div>
            </div>
        </>
    );
}
