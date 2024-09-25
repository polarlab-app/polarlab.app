'use client';
import { useState, useEffect } from 'react';
import styles from '@css/main/carousel.module.scss';
import data from '@data/carousel.json';
import Image from 'next/image';

export default function Carousel({ type }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [manualChange, setManualChange] = useState(false);
    const images = data[type] || [];
    const [color, setColor] = useState(null);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => {
            const nextIndex = (prevIndex + 1) % images.length;
            const nextImageElement = document.querySelector(`.${styles.image}[value="${nextIndex}"]`);
            const c = getAverageRGB(nextImageElement);
            setColor(`rgb(${c.r}, ${c.g}, ${c.b})`);
            setManualChange(true);
            return nextIndex;
        });
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
        const selectedImageElement = document.querySelector(`.${styles.image}[value="${index}"]`);
        const c = getAverageRGB(selectedImageElement);
        setColor(`rgb(${c.r}, ${c.g}, ${c.b})`);
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
        <div className={styles.container} style={{ boxShadow: `5px 5px 65px 0px ${color}` }}>
            <div className={styles.innerContainer}>
                <div className={styles.controls}>
                    {images.map((image, index) => (
                        <div
                            className={`${styles.item} ${currentIndex == index ? styles.active : null}`}
                            key={index}
                            value={index}
                            onClick={() => goToSlide(index)}
                        >
                            <p className={styles.title}>{image.title}</p>
                            <p className={styles.description}>{image.description}</p>
                        </div>
                    ))}
                </div>
                <div className={styles.carousel}>
                    {images.map((image, index) => (
                        <Image
                            width={960}
                            height={540}
                            key={index}
                            src={image.url}
                            alt={`Slide ${index + 1}`}
                            className={`${styles.image} ${index === currentIndex ? styles.active : ''}`}
                            value={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function getAverageRGB(imgEl) {
    var blockSize = 5,
        defaultRGB = { r: 0, g: 0, b: 0 },
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data,
        width,
        height,
        i = -4,
        length,
        rgb = { r: 0, g: 0, b: 0 },
        count = 0;

    if (!context) {
        return defaultRGB;
    }

    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

    context.drawImage(imgEl, 0, 0);

    try {
        data = context.getImageData(0, 0, width, height);
    } catch (e) {
        return defaultRGB;
    }

    length = data.data.length;

    while ((i += blockSize * 4) < length) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i + 1];
        rgb.b += data.data[i + 2];
    }

    rgb.r = ~~(rgb.r / count);
    rgb.g = ~~(rgb.g / count);
    rgb.b = ~~(rgb.b / count);

    return rgb;
}
