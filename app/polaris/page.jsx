import GridItem from '@components/main/gridItem';
import Stars from '@components/main/stars';
import Section from '@components/main/section';
import Landing from '@components/main/landing';

export const metadata = {
    title: 'Polar Lab | Polaris V2',
    description:
        'Welcome to Polaris V2, the all-in-one Discord bot that empowers server owners with advanced features, user-friendly interfaces, and unparalleled support for a seamless experience.',
    keywords: ['Polaris', 'discord', 'bot', 'discord bot', 'Polar Lab', 'community', 'tools', 'services'],
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
                <Landing type='polaris' />
                <Section name='why-polaris' type='grid'>
                    <GridItem format='third' type='polaris-landing-freemium' />
                    <GridItem format='third' type='polaris-landing-open-source' />
                    <GridItem format='third' type='polaris-landing-accessible' />
                    <GridItem format='third' type='polaris-landing-web-dashboard' />
                    <GridItem format='third' type='polaris-landing-ease-of-use' />
                    <GridItem format='third' type='polaris-landing-professional-execution' />
                </Section>
            </div>
        </>
    );
}
