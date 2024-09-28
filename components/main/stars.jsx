'use client';
import { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import styles from '@css/main/stars.module.css';

export default function Stars() {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

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
                    distance: 15,
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
                    value: 50,
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
        return <Particles id='tsparticles' options={options} className={styles.styles} />;
    }

    return <></>;
}
