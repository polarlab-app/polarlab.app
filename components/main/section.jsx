'use client';
import { useEffect } from 'react';
import $ from 'jquery';
import styles from '@css/main/section.module.css';
import data from '@data/sections.json';

export default function Section({ children, name, type }) {
    useEffect(() => {
        const checkVisibility = () => {
            $(`.${styles.sectionheader}, .${styles.sectionsubheader}`).each(function () {
                const elementTop = $(this).offset().top;
                const windowTop = $(window).scrollTop();
                const windowHeight = $(window).height();

                if (elementTop < windowTop + windowHeight * 0.7) {
                    $(this).addClass(styles.animate);
                } else {
                    $(this).removeClass(styles.animate);
                }
            });
        };

        $(window).on('scroll', checkVisibility);

        return () => {
            $(window).off('scroll', checkVisibility);
        };
    }, []);

    return (
        <div className={styles.sitesection} id={data.ids[name]}>
            <div className={styles.siteheading}>
                <h2 className={styles.sectionheader}>{data.headings[name]}</h2>
                <p className={styles.sectionsubheader}>{data.descriptions[name]}</p>
            </div>

            {type === 'grid' ? <div className={styles.featuregrid}>{children}</div> : children}
        </div>
    );
}
