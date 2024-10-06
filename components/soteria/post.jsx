import styles from '@css/soteria/post.module.scss';

export default function Post() {
    return (
        <div className={styles.container}>
            <div className={styles.postContainer}>
                <img className={styles.image} src='https://via.placeholder.com/150' alt='Placeholder' />
                <div className={styles.textContainer}>
                    <div className={styles.authorContainer}>
                        <a className={styles.authorDN}>Spifory</a>
                        <a className={styles.authorUN}>@spf</a>
                        <hr className={styles.dotDivider} />
                        <p className={styles.date}>September 23, 2024</p>
                    </div>
                    <div className={styles.textContainer}>
                        <p className={styles.heading}>This UI is 🔥 Fire!</p>
                        <p className={styles.postContent}>
                            This UI is really cool and I love it! This UI is really cool and I love it! This UI is
                            really cool and I love it! This UI is really cool and I love it! This UI is really cool and
                            I love it! This UI is really cool and I love it! This UI is really cool and I love it! This
                            UI is really cool and I love it! This UI is really cool and I love it! This UI is really
                            cool and I love it! This UI is really cool and I love it! This UI is really cool and I love
                            it! This UI is really cool and I love it! This UI is really cool and I love it!
                        </p>
                    </div>
                    <div className={styles.buttonContainer}>
                        <div className={styles.likeContainer}></div>
                        <div className={styles.shareContainer}></div>
                        <div className={styles.authorOnly}></div>
                    </div>
                </div>
            </div>
            <div className={styles.commentContainer}>
                <div className={styles.commentInput}>
                    <img className={styles.commentImage} src='https://via.placeholder.com/50' alt='Placeholder' />\
                    <textarea className={styles.commentText} placeholder='Write a comment...'></textarea>
                </div>
                <div className={styles.comment}>
                    <img className={styles.commentImage} src='https://via.placeholder.com/50' alt='Placeholder' />
                    <div className={styles.commentTextContainer}>
                        <a className={styles.commentAuthor}>Aertic</a>
                        <p className={styles.commentText}>Something cool to say about this sexy soteria UI</p>
                    </div>
                </div>
                <p className={styles.additionalText}>View More...</p>
            </div>
        </div>
    );
}
