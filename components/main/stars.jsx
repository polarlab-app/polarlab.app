'use client';
import { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
// import { loadAll } from "@/tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from '@tsparticles/slim'; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.
import styles from '@css/main/stars.module.css';

export default function Stars() {
    const [init, setInit] = useState(false);

    // this should be run only once per application lifetime
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
            // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
            // starting from v2 you can add only the features you need reducing the bundle size
            //await loadAll(engine);
            //await loadFull(engine);
            await loadSlim(engine);
            //await loadBasic(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = (container) => {
        console.log(container);
    };

    const options = useMemo(
        () => ({
            background: {
                color: {
                    value: 'transparent',
                },
            },
            fpsLimit: 120,
            interactivity: {
                events: {
                    onClick: {
                        enable: false,
                        mode: 'push',
                    },
                    onHover: {
                        enable: false,
                        mode: 'repulse',
                    },
                },
                modes: {
                    push: {
                        quantity: 4,
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4,
                    },
                },
            },
            particles: {
                color: {
                    value: '#9ba8ba',
                },
                links: {
                    color: '#ffffff',
                    distance: 150,
                    enable: false,
                    opacity: 0.5,
                    width: 1,
                },
                move: {
                    direction: 'bottom',
                    enable: true,
                    outModes: {
                        default: 'out',
                    },
                    random: false,
                    speed: 3,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                    },
                    value: 100,
                },
                opacity: {
                    value: 1,
                    animation: {
                        enable: true,
                        speed: 2,
                        minimumValue: 0.1,
                        sync: false,
                    },
                },
                shadow: {
                    enable: true,
                    blur: 5,
                    color: {
                        value: '#ffffff',
                    },
                },
                shape: {
                    type: 'circle',
                },
                size: {
                    value: { min: 0.5, max: 1 },
                },
            },
            detectRetina: true,
        }),
        []
    );

    if (init) {
        return (
            <Particles id='tsparticles' particlesLoaded={particlesLoaded} options={options} className={styles.styles} />
        );
    }

    return <></>;
}
