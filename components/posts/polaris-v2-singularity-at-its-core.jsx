import Link from 'next/link';

export default function BlogPost() {
    return (
        <>
            <div className='postcontainer'>
                <Link className='home' href='/blog'>
                    <img className='homeicon' src='https://cdn.polarlab.app/src/icons/colorless/home.png' />
                </Link>
                <h1 className='posttitle'>Polaris V2: Elevate your Discord Experience</h1>
                <div className='author'>
                    <img className='postauthorpfp' src='https://cdn.polarlab.app/src/icons/official/pfp.png' />
                    <div className='authortextcontainer'>
                        <a className='postauthoruser' href='https://polarlab.app/u/aertic'>
                            Aertic
                        </a>
                        <p className='postauthorrole'>Founder</p>
                    </div>
                </div>
                <img className='postbanner' src='https://cdn.polarlab.app/src/banners/polarisv2.png' />
                <div className='postcontent'>
                    <h3 className='postsection'>One Bot To Rule Them All</h3>
                    <p className='sectiontext'></p>
                    <p className='sectiontext'>
                        Were thrilled to introduce Polaris 2.0, the next level of Discord bot innovation. With Polaris
                        2.0, weve enhanced and expanded our features to provide you with an even more dynamic and
                        engaging Discord experience. Heres what you can look forward to:
                    </p>
                    <h3 className='postsection'>Enhanced Features</h3>
                    <p className='sectiontext'>
                        Polaris 2.0 brings a slew of new and improved features. From advanced moderation tools to
                        enhanced AI capabilities, were committed to ensuring your server remains safe, secure, and
                        interactive. Polaris 2.0 isnt just an update; its a leap forward in Discord bot technology.
                    </p>
                    <h3 className='postsection'>Roadmap for the Future</h3>
                    <p className='sectiontext'>
                        We believe in transparency, which is why weve laid out our roadmap for Polaris 2.0. This roadmap
                        outlines the exciting features and enhancements we have planned for the future. Take a look
                        below at whats in store:
                    </p>
                    <h3 className='postsection'>Web Dashboard</h3>
                    <p className='sectiontext'>
                        Polaris 2.0 introduces a user-friendly web dashboard. With this dashboard, managing your server
                        settings, configuring commands, and monitoring server activity has never been easier. Weve
                        designed it with simplicity and convenience in mind, ensuring you have full control at your
                        fingertips.
                    </p>
                    <h3 className='postsection'>Ease of use</h3>
                    <p className='sectiontext'>
                        Polaris 2.0 introduces a user-friendly web dashboard. With this dashboard, managing your server
                        settings, configuring commands, and monitoring server activity has never been easier. Weve
                        designed it with simplicity and convenience in mind, ensuring you have full control at your
                        fingertips.
                    </p>
                    <p className='postsubsection'>Reliability</p>
                    <p className='sectiontext'>
                        We understand that reliability is paramount when it comes to Discord bots. Polaris 2.0 is built
                        with stability and uptime in mind. Our dedicated team works tirelessly to ensure that Polaris
                        2.0 remains consistently available to serve your servers needs. You can trust that Polaris will
                        be there when you need it, ensuring uninterrupted service for your server, 24/7.
                    </p>
                    <p className='postsubsection'>Weekly Updates</p>
                    <p className='sectiontext'>
                        Our commitment to your servers freshness and excitement means you can expect weekly updates that
                        keep your server experience fresh and dynamic. Were constantly listening to your feedback and
                        making improvements. These updates not only bring new features but also ensure that Polaris 2.0
                        is running at its best.
                    </p>
                    <p className='postsubsection'>Awesome Docs</p>
                    <p className='sectiontext'>
                        We understand that a great bot deserves great documentation. Thats why we offer comprehensive
                        documentation that goes beyond just explaining features. Our docs are designed to guide you
                        through every aspect of Polaris 2.0, from installation to advanced customizations. Youll find
                        clear, step-by-step instructions, tutorials, and use-case examples to help you make the most of
                        Polaris 2.0s capabilities.
                    </p>
                    <p className='postsubsection'>Public Beta</p>
                    <p className='sectiontext'>
                        To ensure the highest level of quality and gather valuable user feedback, were launching a
                        public test beta right within our Discord server. This means youll have the opportunity to be
                        among the first to try out new features, provide input, and help shape the direction of Polaris
                        2.0. Your participation in our beta program is invaluable in making Polaris the best it can be.
                    </p>
                </div>
            </div>
        </>
    );
}
