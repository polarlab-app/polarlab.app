'use client';
import { useState, useEffect } from 'react';

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
                    const rgbValues = randomColor.match(/\d+/g);
                    const rgbaColor = `rgba(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]}, 0.5)`;

                    $(`.${styles.palletetable}`).css('box-shadow', `5px 5px 80px 2px ${rgbaColor}`);
                    /*$(`.${styles.palletetable}`).css(
                        'background-image',
                        `radial-gradient(${randomColor}, rgb(15, 15, 20) 70%)`
                    );*/
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
                    const sectionIndex = Math.floor(index / 14);
                    if (index % 14 === 0) {
                        return (
                            <section
                                key={sectionIndex}
                                className={styles.section}
                                data-colors={JSON.stringify(colors.slice(index, index + 14))}>
                                <h2>Section {sectionIndex + 1}</h2>
                                <table className={styles.palletetable}>
                                    <thead>
                                        <tr className={styles.tablerow}>
                                            <th className={styles.tablehead}>
                                                <div className={styles.innerth}></div>HEX
                                            </th>
                                            <th className={styles.tablehead}>RGB</th>
                                            <th className={styles.tablehead}>Dark Mode</th>
                                            <th className={styles.tablehead}>Light Mode</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {colors.slice(index, index + 12).map((color, i) => {
                                            return (
                                                <tr key={i} className={styles.tablerow}>
                                                    <td className={styles.tablecell}>{color.backgroundColor}</td>
                                                    <td className={styles.tablecell}>{color.backgroundColor}</td>
                                                    <td className={styles.tablecell}>
                                                        <div
                                                            className={styles.darkmode}
                                                            style={{ color: color.backgroundColor }}>
                                                            Text Color
                                                        </div>
                                                    </td>
                                                    <td className={styles.tablecell}>
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
