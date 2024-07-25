import GridItem from '@components/main/gridItem';
import Landing from '@components/main/landing';
import Stars from '@components/main/stars';
import Section from '@components/main/section';

export default function Home() {
    return (
        <>
            <Stars />
            <div className="main">
                <Landing type="master" />
                <Section name="our-services">
                    <GridItem format="full" type="landing-polaris" />
                    <GridItem format="twothirds" type="landing-polarmc" />
                    <GridItem format="third" type="landing-gdk" />
                </Section>
            </div>
        </>
    );
}
