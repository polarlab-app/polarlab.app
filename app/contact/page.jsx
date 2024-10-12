import styles from '@css/main/contact.module.scss';
import Link from 'next/link';
export const metadata = {
    title: 'Polar Lab | Contact Us',
    description:
        'Contact the Polar Lab team for support, inquiries, or partnership opportunities. We are here to help and provide you with the best experience possible.',
    keywords: ['contact', 'support', 'partnership', 'Polar Lab', 'Polaris'],
    authors: [{ name: 'Aertic', url: 'https://polarlab.app' }],
    creator: 'Aertic',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        images: [
            {
                url: 'https://cdn.polarlab.app/src/img/polarlogo.png',
                width: 1200,
                height: 630,
            },
        ],
    },
};

export default async function Page() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.heading}>How can we help?</h1>
                <p className={styles.subHeading}>
                    Get in touch with us for product inquiries, product support or anything else.
                </p>
            </div>
            <div className={styles.options}>
                <div className={styles.option}>
                    <div className={styles.optionHeader}>
                        <i className={`${styles.optionIcon} icon-discord`}></i>
                        <h2 className={styles.optionHeading}>Community Support</h2>
                    </div>
                    <p className={styles.optionText}> Ask product questions, report problems, or leave feedback.</p>
                    <a className={styles.button}>Contact Support</a>
                </div>
                <div className={styles.option}>
                    <div className={styles.optionHeader}>
                        <i className={`${styles.optionIcon} icon-message`}></i>
                        <h2 className={styles.optionHeading}>Help & Support</h2>
                    </div>
                    <p className={styles.optionText}> Ask product questions, report problems, or leave feedback.</p>
                    <a className={styles.button}>Contact Support</a>
                </div>
            </div>
            <div className={styles.links}>
                <div className={styles.linkContainer}>
                    <div className={styles.link}>
                        <h3 className={styles.linkHeader}>Join the community</h3>
                        <p className={styles.linkText}>
                            More than 40 Polar Lab users share questions and best practices in our Discord server.
                        </p>
                        <Link className={styles.linkButton} href='/'>
                            Join Discord
                        </Link>
                    </div>
                    <div className={styles.link}>
                        <h3 className={styles.linkHeader}>General communication</h3>
                        <p className={styles.linkText}>For other queries, please get in touch with us via email.</p>
                        <Link className={styles.linkButton} href='mailto:support@polarlab.app'>
                            support@polarlab.app
                        </Link>
                    </div>
                </div>
                <hr className={styles.divider} />
                <div className={styles.linkContainer}>
                    <div className={styles.link}>
                        <h3 className={styles.linkHeader}>Documentation</h3>
                        <p className={styles.linkText}>
                            Find information on how to use all of your services and products in our documentation.
                        </p>
                        <Link className={styles.linkButton} href='https://docs.polarlab.app'>
                            Polar Lab Docs
                        </Link>
                    </div>
                </div>
            </div>
            <div className={styles.statusContainer}>
                <i className={`${styles.statusIcon} icon-check`}></i>
                <Link className={styles.status} href='/status'>
                    All Systems Operational
                </Link>
            </div>
        </div>
    );
}
