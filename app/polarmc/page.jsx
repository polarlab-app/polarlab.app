import GridItem from '@components/main/gridItem';
import Stars from '@components/main/stars';
import Landing from '@components/main/landing';
import Section from '@components/main/section';

export const metadata = {
    title: 'Polar MC',
    description: 'The official Polar MC Season 2 landing page',
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
