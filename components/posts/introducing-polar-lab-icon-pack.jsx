import Link from 'next/link';

export default function BlogPost() {
    return (
        <>
            <div className='postcontainer'>
                <Link className='home' href='/blog'>
                    <img className='homeicon' src='https://cdn.polarlab.app/src/icons/colorless/home.png' />
                </Link>
                <div className='posttop'>
                    <h1 className='posttitle'>Introducing: Polar Lab Icon Pack</h1>
                    <div className='author'>
                        <img className='postauthorpfp' src='https://cdn.polarlab.app/src/icons/official/pfp.png' />
                        <div className='authortextcontainer'>
                            <a className='postauthoruser' href='https://polarlab.app/u/aertic'>
                                Aertic
                            </a>
                            <p className='postauthorrole'>Founder</p>
                        </div>
                    </div>
                </div>
                <img className='postbanner' src='https://cdn.polarlab.app/src/blog/cover/iconpack.png' />
                <div className='postcontent'>
                    <h3 className='postsection'>The Polar Lab Icon Pack</h3>
                    <p className='sectiontext'>
                        For the last couple of days, we have been meticulously crafting icons to server your every need.
                        Together we have created over 42000 icons in all of the major colors to fit your specific color
                        scheme. These icons were made to nicely fit both dark and light themed projects, so need to
                        worry there.
                    </p>
                    <p className='sectiontext'>
                        All icons are supplied from Fontawesome, and all colors were inspired by the folks at Omni Labs.
                        Feel free to check out both of these awesome services!
                    </p>
                    <p className='sectiontext'>
                        All icons included in the Polar Lab Icon Pack are free and open-source, requiring no attribution
                        and can be modified and distributed as standalone copies, although it would be nice to throw in
                        a good word for us and use the official download page! :D
                    </p>
                    <p className='section'></p>
                    <h3 className='postsection'>Create Your Own</h3>
                    <p className='sectiontext'>
                        Feel like the official colors don't suit your needs? Have a different icon style in mind? No
                        problem! We took all of this into account and created a simple program to automate making your
                        own custom icons. This program is available on your Github, as well as in a web GUI version on
                        our site under the Glorious Development Kit.
                    </p>
                    <p className='sectiontext'>
                        All icons created through this program, are yours and have all the legal and copyright rights to
                        them, no need to worry. Just check your icon libraries terms first.
                    </p>
                </div>
            </div>
        </>
    );
}
