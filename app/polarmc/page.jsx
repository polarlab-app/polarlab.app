import GridItem from '@components/main/gridItem';
import Stars from '@components/main/stars';
import Landing from '@components/main/landing';
import Section from '@components/main/section';

export const metadata = {
    title: 'Polar Lab | Polar MC',
    description:
        'Dive into an immersive gaming community with PolarMC Season 2. Explore vast, custom biomes and a pre-generated world. Join now for a unique gaming experience and connect with fellow gamers.',
    keywords: ['PolarMC', 'gaming', 'community', 'Polar Lab'],
    authors: [{ name: 'Aertic', url: 'https://polarlab.app' }],
    creator: 'Aertic',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        images: [
            {
                url: 'https://cdn.polarlab.app/src/img/polarlogo.png',
                width: 1200,
                height: 630,
            },
        ],
    },
};

export default function Page() {
    return (
        <>
            <Stars />
            <div className='main'>
                <Landing type='polar-mc' />
                <Section name='why-polar-mc' type='grid'>
                    <GridItem format='half' type='polarmc-landing-community' />
                    <GridItem format='half' type='polarmc-landing-compatibility' />
                </Section>
                <Section name='polar-mc-world' type='grid'>
                    <GridItem format='third' type='polarmc-landing-live-map' />
                    <GridItem format='twothirds' type='polarmc-landing-massive-pregenerated-world' />
                    <GridItem format='twothirds' type='polarmc-landing-custom-biomes' />
                    <GridItem format='third' type='polarmc-landing-vanilla-plus-world-generation' />
                </Section>
            </div>
        </>
    );
}
