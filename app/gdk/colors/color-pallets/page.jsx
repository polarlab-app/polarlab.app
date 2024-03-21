'use client';
import { useState, useEffect, useRef } from 'react';

import colors from '@/src/data/colors.json';
import styles from '@/src/css/gdk/colorPallets.module.css';
import $ from 'jquery';

export default function Page() {
    const [selectedColor, setSelectedColor] = useState('');

    useEffect(() => {
        const checkVisibilityAndChangeColor = () => {
            const sections = $(`.${styles.section}`);
            sections.each((index, section) => {
                const rect = section.getBoundingClientRect();
                if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                    const sectionColors = $(section).data('colors');
                    const randomColor = sectionColors[Math.floor(Math.random() * sectionColors.length)].backgroundColor;
                    $(`.${styles.main}`).css('background', `radial-gradient(${randomColor}, rgb(15, 15, 20) 70%, 0.3)`);
                    return false;
                }
            });
        };

        const innermain = document.querySelector(`.${styles.innermain}`);
        if (innermain) {
            $(innermain).on('scroll', checkVisibilityAndChangeColor);
        }

        return () => {
            if (innermain) {
                $(innermain).off('scroll', checkVisibilityAndChangeColor);
            }
        };
    }, []);

    return (
        <div className={styles.main}>
            <div className={styles.innermain}>
                {colors.map((color, index) => {
                    const sectionIndex = Math.floor(index / 12);

                    if (index % 12 === 0) {
                        console.log();
                        return (
                            <section
                                key={sectionIndex}
                                className={styles.section}
                                data-colors={JSON.stringify(colors.slice(index, index + 12))}>
                                <h2>Section {sectionIndex + 1}</h2>
                                <table className={styles.palletetable}>
                                    <thead>
                                        <tr className={styles.tablerow}>
                                            <th>HEX</th>
                                            <th>RGB</th>
                                            <th>Dark Mode</th>
                                            <th>Light Mode</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {colors.slice(index, index + 12).map((color, i) => {
                                            return (
                                                <tr key={i} className={styles.tablerow}>
                                                    <td>{color.backgroundColor}</td>
                                                    <td>{color.backgroundColor}</td>
                                                    <td>
                                                        <div
                                                            className={styles.darkmode}
                                                            style={{ color: color.backgroundColor }}>
                                                            Text Color
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div
                                                            className={styles.lightmode}
                                                            style={{ color: color.backgroundColor }}>
                                                            Text Color
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </section>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
}
