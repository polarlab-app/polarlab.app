'use client';
import { useState, useEffect } from 'react';
import styles from '@css/main/carousel.module.css';
import data from '@data/carousel.json';

export default function Carousel({ type }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [manualChange, setManualChange] = useState(false);
    const images = data[type] || [];

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setManualChange(true);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        setManualChange(true);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
        setManualChange(true);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
            setManualChange(false);
        }, 5000);

        if (manualChange) {
            clearInterval(timer);
            setManualChange(false);
        }

        return () => clearInterval(timer);
    }, [manualChange]);

    return (
        <div className={styles.carousel}>
            <div className={styles.carouselcontainer}>
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className={`${styles.carouselimage} ${index === currentIndex ? styles.active : ''}`}
                    />
                ))}
            </div>
            <div className={styles.controls}>
                <button onClick={prevSlide} className={`${styles.arrow} ${styles.leftarrow}`}>
                    &lt;
                </button>
                <div className={styles.dots}>
                    {images.map((_, index) => (
                        <span
                            key={index}
                            className={`${styles.dot} ${index === currentIndex ? styles.activedot : ''}`}
                            onClick={() => goToSlide(index)}
                        ></span>
                    ))}
                </div>
                <button onClick={nextSlide} className={`${styles.arrow} ${styles.rightarrow}`}>
                    &gt;
                </button>
            </div>
        </div>
    );
}
