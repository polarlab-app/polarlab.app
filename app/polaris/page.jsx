import GridItem from '@components/main/gridItem';
import Stars from '@components/main/stars';
import Section from '@components/main/section';
import Landing from '@components/main/landing';

export const metadata = {
    title: 'Polaris V2',
    description: 'One bot to rule them all, one bot to surpass them all',
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
