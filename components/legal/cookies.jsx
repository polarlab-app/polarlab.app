'use server';
import styles from '@css/legal/legal.module.scss';
import Link from 'next/link';

export default async function Cookies() {
    return (
        <div className={styles.containerWrapper}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.heading}>Cookie Policy</h1>
                    <p className={styles.date}>Last Updated: October 11th, 2024</p>
                </div>
                <div className={styles.chapter}>
                    <p className={styles.chapterText}>
                        This Cookie Policy explains how Polar Lab (<span className={styles.bold}>Company,</span>{' '}
                        <span className={styles.bold}>we,</span> <span className={styles.bold}>us,</span> and{' '}
                        <span className={styles.bold}>our</span>) uses cookies and similar technologies to recognize you
                        when you visit our website at{' '}
                        <Link href='https://polarlab.app' className={styles.link}>
                            https://polarlab.app
                        </Link>{' '}
                        (<span className={styles.bold}>Website</span>). It explains what these technologies are and why
                        we use them, as well as your rights to control our use of them.
                    </p>
                    <p className={styles.chapterText}>
                        In some cases we may use cookies to collect personal information, or that becomes personal
                        information if we combine it with other information.
                    </p>
                </div>
                <div className={styles.chapter}>
                    <h2 className={styles.chapterHeader} id='what-are-cookies'>
                        1. What are cookies?
                    </h2>
                    <p className={styles.chapterText}>
                        Cookies are small data files that are placed on your computer or mobile device when you visit a
                        website. Cookies are widely used by website owners in order to make their websites work, or to
                        work more efficiently, as well as to provide reporting information.
                    </p>
                    <p className={styles.chapterText}>
                        Cookies set by the website owner (in this case, Polar Lab ) are called &quot;first party
                        cookies&quot;. Cookies set by parties other than the website owner are called &quot;third party
                        cookies&quot;. Third party cookies enable third party features or functionality to be provided
                        on or through the website (e.g. like advertising, interactive content and analytics). The
                        parties that set these third party cookies can recognize your computer both when it visits the
                        website in question and also when it visits certain other websites.
                    </p>
                </div>
                <div className={styles.chapter}>
                    <h2 className={styles.chapterHeader} id='why-do-we-use-cookies'>
                        2. Why do we use cookies?
                    </h2>
                    <p className={styles.chapterText}>
                        We use first and third party cookies for several reasons. Some cookies are required for
                        technical reasons in order for our Website to operate, and we refer to these as
                        &quot;essential&quot; or &quot;strictly necessary&quot; cookies. Other cookies also enable us to
                        track and target the interests of our users to enhance the experience on our Online Properties.
                        Third parties serve cookies through our Website for advertising, analytics and other purposes.
                        This is described in more detail below.
                    </p>
                </div>
                <div className={styles.chapter}>
                    <h2 className={styles.chapterHeader} id='how-can-i-control-cookies'>
                        3. How can I control cookies?
                    </h2>
                    <p className={styles.chapterText}>
                        You have the right to decide whether to accept or reject cookies. You can exercise your cookie
                        rights by setting your preferences in the Cookie Consent Manager. The Cookie Consent Manager
                        allows you to select which categories of cookies you accept or reject. Essential cookies cannot
                        be rejected as they are strictly necessary to provide you with services
                    </p>
                    <p className={styles.chapterText}>
                        You can set or amend your web browser controls to accept or refuse cookies. If you choose to
                        reject cookies, you may still use our website though your access to some functionality and areas
                        of our website may be restricted. As the means by which you can refuse cookies through your web
                        browser controls vary from browser-to-browser, you should visit your browser&apos;s help menu
                        for more information.
                    </p>
                    <p className={styles.chapterText}>
                        The Cookie Consent Manager can be found in the notification banner and on our website. If you
                        choose to reject cookies, you may still use our website though your access to some functionality
                        and areas of our website may be restricted. You may also set or amend your web browser controls
                        to accept or refuse cookies.
                    </p>
                    <p className={styles.chapterText}>
                        The specific types of first- and third-party cookies served through our Website and the purposes
                        they perform are described in the table below (please note that the specific cookies served may
                        vary depending on the specific Online Properties you visit):
                    </p>
                </div>
                <div className={styles.chapter}>
                    <h2 className={styles.chapterHeader} id='essential-website-cookies'>
                        4. Essential website cookies:
                    </h2>
                    <p className={styles.chapterText}>
                        These cookies are strictly necessary to provide you with services available through our Website
                        and to use some of its features, such as access to secure areas.
                    </p>
                </div>
                <div className={styles.chapter}>
                    <h2 className={styles.chapterHeader} id='how-can-i-control-cookies-on-my-browser'>
                        5. How can I control cookies on my browser?
                    </h2>
                    <p className={styles.chapterText}>
                        You can set or amend your web browser controls to accept or refuse cookies. If you choose to
                        reject cookies, you may still use our website though your access to some functionality and areas
                        of our website may be restricted. As the means by which you can refuse cookies through your web
                        browser controls vary from browser-to-browser, you should visit your browser&apos;s help menu
                        for more information. The following is information about how to manage cookies on the most
                        popular browsers:
                    </p>
                    <ul className={styles.chapterList}>
                        <li className={styles.chapterListItem}>
                            <Link href='https://support.google.com/chrome/answer/95647?hl=en' className={styles.link}>
                                Google Chrome
                            </Link>
                        </li>
                        <li className={styles.chapterListItem}>
                            <Link
                                href='https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences'
                                className={styles.link}
                            >
                                Mozilla Firefox
                            </Link>
                        </li>
                        <li className={styles.chapterListItem}>
                            <Link
                                href='https://support.microsoft.com/en-gb/help/17442/windows-internet-explorer-delete-manage-cookies'
                                className={styles.link}
                            >
                                Microsoft Internet Explorer
                            </Link>
                        </li>
                        <li className={styles.chapterListItem}>
                            <Link
                                href='https://support.apple.com/en-gb/guide/safari/sfri11471/mac'
                                className={styles.link}
                            >
                                Safari (macOS)
                            </Link>
                        </li>
                        <li className={styles.chapterListItem}>
                            <Link
                                href='https://support.apple.com/en-gb/guide/safari/sfri11471/mac'
                                className={styles.link}
                            >
                                Safari (iOS)
                            </Link>
                        </li>
                    </ul>
                    <p className={styles.chapterText}>
                        In addition, most advertising networks offer you a way to opt out of targeted advertising. If
                        you would like to find out more information, please visit:
                    </p>
                    <ul className={styles.chapterList}>
                        <li className={styles.chapterListItem}>
                            <Link href='https://optout.aboutads.info/?c=2&lang=EN' className={styles.link}>
                                Digital Advertising Alliance
                            </Link>
                        </li>
                        <li className={styles.chapterListItem}>
                            <Link href='https://youradchoices.ca/' className={styles.link}>
                                Digital Advertising Alliance of Canada
                            </Link>
                        </li>
                        <li className={styles.chapterListItem}>
                            <Link href='http://www.youronlinechoices.com' className={styles.link}>
                                European Interactive Digital Advertising Alliance
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={styles.chapter}>
                    <h2 className={styles.chapterHeader} id='what-about-other-tracking-technologies-like-web-beacons'>
                        6. What about other tracking technologies, like web beacons?
                    </h2>
                    <p className={styles.chapterText}>
                        Cookies are not the only way to recognize or track visitors to a website. We may use other,
                        similar technologies from time to time, like web beacons (sometimes called &quot;tracking
                        pixels&quot; or &quot;clear gifs&quot;). These are tiny graphics files that contain a unique
                        identifier that enable us to recognize when someone has visited our Website. This allows us, for
                        example, to monitor the traffic patterns of users from one page within our Website to another,
                        to deliver or communicate with cookies, to understand whether you have come to our Website from
                        an online advertisement displayed on a third-party website, to improve site performance, and to
                        measure the success of e-mail marketing campaigns. In many instances, these technologies are
                        reliant on cookies to function properly, and so declining cookies will impair their functioning.
                    </p>
                </div>
                <div className={styles.chapter}>
                    <h2 className={styles.chapterHeader} id='do-you-use-flash-cookies-or-local-shared-objects'>
                        7. Do you use Flash cookies or Local Shared Objects?
                    </h2>
                    <p className={styles.chapterText}>
                        Our Website may also use so-called &quot;Flash Cookies&quot; (also known as Local Shared Objects
                        or &quot;LSOs&quot;) to, among other things, collect and store information about your use of our
                        services, fraud prevention and for other site operations.
                    </p>
                    <p className={styles.chapterText}>
                        If you do not want Flash Cookies stored on your computer, you can adjust the settings of your
                        Flash player to block Flash Cookies storage using the tools contained in the{' '}
                        <Link
                            href='http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager07.html'
                            className={styles.link}
                        >
                            Website Storage Settings Panel
                        </Link>
                        . You can also control Flash Cookies by going to the{' '}
                        <Link
                            href='http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager03.html'
                            className={styles.link}
                        >
                            Global Storage Settings Panel
                        </Link>{' '}
                        and following the instructions (which may include instructions that explain, for example, how to
                        delete existing Flash Cookies (referred to &quot;information&quot; on the Macromedia site), how
                        to prevent Flash LSOs from being placed on your computer without your being asked, and (for
                        Flash Player 8 and later) how to block Flash Cookies that are not being delivered by the
                        operator of the page you are on at the time).
                    </p>
                    <p className={styles.chapterText}>
                        Please note that setting the Flash Player to restrict or limit acceptance of Flash Cookies may
                        reduce or impede the functionality of some Flash applications, including, potentially, Flash
                        applications used in connection with our services or online content.
                    </p>
                </div>
                <div className={styles.chapter}>
                    <h2 className={styles.chapterHeader} id='do-you-serve-targeted-advertising'>
                        8. Do you serve targeted advertising?
                    </h2>
                    <p className={styles.chapterText}>
                        Nope, no targeted advertising to see here. Actually no advertising at all! Thats cool to see!
                    </p>
                </div>
                <div className={styles.chapter}>
                    <h2 className={styles.chapterHeader} id='how-often-will-you-update-this-cookie-policy'>
                        9. How often will you update this Cookie Policy?
                    </h2>
                    <p className={styles.chapterText}>
                        We may update this Cookie Policy from time to time in order to reflect, for example, changes to
                        the cookies we use or for other operational, legal or regulatory reasons. Please therefore
                        re-visit this Cookie Policy regularly to stay informed about our use of cookies and related
                        technologies.
                    </p>
                    <p className={styles.chapterText}>
                        The date at the top of this Cookie Policy indicates when it was last updated.
                    </p>
                </div>
                <div className={styles.chapter}>
                    <h2 className={styles.chapterHeader} id='where-can-i-get-further-information'>
                        10. Where can I get further information?
                    </h2>
                    <p className={styles.chapterText}>
                        If you have any questions about our use of cookies or other technologies, please email us at{' '}
                        <Link href='mailto:privacy@polarlab.app' className={styles.link}>
                            privacy@polarlab.app
                        </Link>
                    </p>
                </div>
            </div>
            <div className={styles.overview}>
                <p className={styles.overviewHeading}>OVERVIEW</p>

                <ol className={styles.overviewList}>
                    <li className={styles.overviewListItem}>
                        <Link className={styles.link} href='#what-are-cookies'>
                            What are cookies?
                        </Link>
                    </li>
                    <li className={styles.overviewListItem}>
                        <Link className={styles.link} href='#why-do-we-use-cookies'>
                            Why do we use cookies?
                        </Link>
                    </li>
                    <li className={styles.overviewListItem}>
                        <Link className={styles.link} href='#how-can-i-control-cookies'>
                            How can I control cookies?
                        </Link>
                    </li>
                    <li className={styles.overviewListItem}>
                        <Link className={styles.link} href='#essential-website-cookies'>
                            Essential website cookies
                        </Link>
                    </li>
                    <li className={styles.overviewListItem}>
                        <Link className={styles.link} href='#how-can-i-control-cookies-on-my-browser'>
                            How can I control cookies on my browser?
                        </Link>
                    </li>
                    <li className={styles.overviewListItem}>
                        <Link className={styles.link} href='#what-about-other-tracking-technologies-like-web-beacons'>
                            What about other tracking technologies, like web beacons?
                        </Link>
                    </li>
                    <li className={styles.overviewListItem}>
                        <Link className={styles.link} href='#do-you-use-flash-cookies-or-local-shared-objects'>
                            Do you use Flash cookies or Local Shared Objects?
                        </Link>
                    </li>
                    <li className={styles.overviewListItem}>
                        <Link className={styles.link} href='#do-you-serve-targeted-advertising'>
                            Do you serve targeted advertising?
                        </Link>
                    </li>
                    <li className={styles.overviewListItem}>
                        <Link className={styles.link} href='#how-often-will-you-update-this-cookie-policy'>
                            How often will you update this Cookie Policy?
                        </Link>
                    </li>
                    <li className={styles.overviewListItem}>
                        <Link className={styles.link} href='#where-can-i-get-further-information'>
                            Where can I get further information?
                        </Link>
                    </li>
                </ol>
            </div>
        </div>
    );
}
