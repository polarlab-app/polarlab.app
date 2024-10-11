'use server';
import styles from '@css/core/footer.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default async function Footer() {
    return (
        <footer className={styles.footercontainer} id='footer'>
            <div className={styles.footer}>
                <div className={styles.footertop}>
                    <Image
                        height='128'
                        width='128'
                        src='https://cdn.polarlab.app/src/img/polarlogo.png'
                        className={styles.footerlogo}
                        alt='alt'
                    />
                    <h1 className={styles.footerheader}>Polar Lab</h1>
                    <Link className={styles.dbtn} href='/discord'>
                        Discord
                    </Link>
                </div>
                <div className={styles.lists}>
                    <div className={styles.list}>
                        <ul className={styles.listcontainer}>
                            <li className={styles.listheader}>
                                <p className={styles.listheader}>Products</p>
                            </li>
                            <li className={styles.listcontent}>
                                <Link className={styles.listcontent} href='/polaris' prefetch={false}>
                                    Polaris V2
                                </Link>
                            </li>
                            <li className={styles.listcontent}>
                                <Link className={styles.listcontent} href='/polarmc' prefetch={false}>
                                    Polar MC
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.list}>
                        <ul className={styles.listcontainer}>
                            <li className={styles.listheader}>
                                <p className={styles.listheader}>Resources</p>
                            </li>
                            <li className={styles.listcontent}>
                                <Link className={styles.listcontent} href='/blog' prefetch={false}>
                                    Blog
                                </Link>
                            </li>
                            <li className={styles.listcontent}>
                                <Link className={styles.listcontent} href='https://docs.polarlab.app' prefetch={false}>
                                    Docs
                                </Link>
                            </li>
                            <li className={styles.listcontent}>
                                <Link className={styles.listcontent} href='/status'>
                                    Status
                                </Link>
                            </li>
                            <li className={styles.listcontent}>
                                <Link className={styles.listcontent} href='/dashboard/logging' prefetch={false}>
                                    Polaris Dashboard
                                </Link>
                            </li>
                            <li className={styles.listcontent}>
                                <Link className={styles.listcontent} href='/contact'>
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.list}>
                        <ul className={styles.listcontainer}>
                            <li className={styles.listheader}>
                                <p className={styles.listheader}>Legal</p>
                            </li>
                            <li className={styles.listcontent}>
                                <Link className={styles.listcontent} href='/legal?page=terms' prefetch={false}>
                                    Terms of Service
                                </Link>
                            </li>
                            <li className={styles.listcontent}>
                                <Link className={styles.listcontent} href='/legal?page=privacy' prefetch={false}>
                                    Privacy Policy
                                </Link>
                            </li>
                            <li className={styles.listcontent}>
                                <Link className={styles.listcontent} href='/legal?page=cookies' prefetch={false}>
                                    Cookie Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={styles.footer2}>
                <Link className={styles.copyr} href='https://polarlab.app'>
                    <i className={`${styles.icon} icon-copyright`}></i> 2024 Polar Lab
                </Link>
                <div className={styles.status}>
                    <Link className={styles.product} href='/status' prefetch={false}>
                        Polaris Status:
                    </Link>
                    <Image
                        src='https://cdn.polarlab.app/src/icons/status/indigo.png'
                        className={styles.statusicon}
                        alt='alt'
                        width='128'
                        height='128'
                    />
                    <Link className={styles.statustext} href='/status' prefetch={false}>
                        Online
                    </Link>
                </div>
                <div className={styles.socials}>
                    <Link href='/discord' aria-label='Discord'>
                        <i className={`icon-discord ${styles.discordlogo}`}></i>
                    </Link>
                    <Link href='https://github.com/polarlab-app' aria-label='GitHub'>
                        <i className={`icon-github ${styles.discordlogo}`}></i>
                    </Link>
                </div>
            </div>
        </footer>
    );
}
