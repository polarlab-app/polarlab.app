'use client';

const { titles, descriptions, images, buttons } = require('@data/gridItems.json');
import styles from '@css/main/gridItem.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import $ from 'jquery';

export default function GridItem({ format, type }) {
    useEffect(() => {
        const checkVisibility = () => {
            console.log('scroll1');

            $(`.${styles.griditem}, .${styles.siteheading}`).each(function () {
                const elementTop = $(this).offset().top;
                const windowTop = $(window).scrollTop();
                const windowHeight = $(window).height();
                console.log('scroll');

                if (elementTop < windowTop + windowHeight * 0.9) {
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
        <div className={`${styles.griditem} ${styles['gridrow' + format]}`}>
            <div className={styles.gridtextcontainer}>
                <h4 className={styles.gridheader}>{titles[type]}</h4>
                <p className={styles.gridcontent}>
                    <span>{descriptions[type]}</span>
                </p>
                <Link className={styles.gridbutton} href={buttons[type]}>
                    Check It Out
                </Link>
            </div>
            <img alt='gridimg' className={styles.gridimg} src={images[type]} />
        </div>
    );
}
