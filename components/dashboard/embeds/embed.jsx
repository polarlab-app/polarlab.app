'use client';
import styles from '@css/dashboard/embed.module.scss';
import { useState } from 'react';

export default function Embed() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [authorIconUrl, setAuthorIconUrl] = useState('');
    const [footerText, setFooterText] = useState('');
    const [footerIconUrl, setFooterIconUrl] = useState('');
    const [timeStamp, setTimestamp] = useState('');

    return (
        <>
            <div className={styles.inputContainer}>
                <div className={styles.top}>
                    <h2 className={styles.heading}>Component Editor</h2>
                    <p className={styles.headingDescription}>Edit components with ease</p>
                </div>
                <div className={styles.inputSection}>
                    <div className={`${styles.input} ${styles.colorInput}`}>
                        <label className={styles.label}></label>
                        <input className={styles.inputElement}></input>
                    </div>
                </div>
            </div>
            <div className={styles.embedContainer}>
                <div className={styles.colorStrip}></div>
                <div className={styles.textContainer}>
                    <div className={styles.top}>
                        <div className={styles.left}>
                            <div className={styles.authorContainer}>
                                <div className={styles.authorIconContainer}>
                                    <img
                                        src='https://cdn.polarlab.app/api/fetch/img/polarlogo/png'
                                        alt='author'
                                        className={styles.authorIcon}
                                    ></img>
                                    <div className={styles.authorIconOverlay}></div>
                                </div>
                                <p className={styles.author}>{authorName || 'Author Name'}</p>
                            </div>
                            <div className={styles.essentials}>
                                <p className={styles.title}>{title || 'Embed Title'}</p>
                                <p className={styles.description}>{description || 'Embed Description'}</p>
                            </div>
                        </div>
                        <div className={styles.thumbnailContainer}>
                            <div className={styles.thumbnailOverlay}></div>
                            <img
                                src='https://cdn.polarlab.app/api/fetch/img/polarlogo/png'
                                alt='author'
                                className={styles.thumbnail}
                            />
                        </div>
                    </div>
                    <div className={styles.footer}>
                        <img />
                        <input
                            onChange={(e) => setFooterText(e.target.value)}
                            placeholder='Embed Footer'
                            value={footerText}
                            className={styles.footerText}
                        ></input>
                        ·
                        <input
                            onChange={(e) => setFooterText(e.target.value)}
                            placeholder='Timestamp'
                            value={footerText}
                            className={styles.footerText}
                        ></input>
                    </div>
                </div>
            </div>
        </>
    );
}
