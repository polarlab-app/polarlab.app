import '../src/css/core/footer.css';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className='footercontainer'>
            <div className='footer'>
                <div className='footertop'>
                    <Image
                        height='128'
                        width='128'
                        src='https://cdn.polarlab.app/src/img/polarlogo.png'
                        className='footerlogo'
                        alt='alt'
                    />
                    <h1 className='footerheader'>Polar Lab</h1>
                    <Link className='dbtn' href='/discord'>
                        Discord
                    </Link>
                </div>
                <div className='lists'>
                    <div className='list'>
                        <ul className='listcontainer'>
                            <li className='listheader'>
                                <p className='listheader'>Products</p>
                            </li>
                            <li className='listcontent'>
                                <Link className='listcontent' href='/polaris' prefetch={false}>
                                    Polaris V2
                                </Link>
                            </li>
                            <li className='listcontent'>
                                <Link className='listcontent' href='/polarmc' prefetch={false}>
                                    Polar MC
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className='list'>
                        <ul className='listcontainer'>
                            <li className='listheader'>
                                <p className='listheader'>Resources</p>
                            </li>
                            <li className='listcontent'>
                                <Link className='listcontent' href='/blog' prefetch={false}>
                                    Blog
                                </Link>
                            </li>
                            <li className='listcontent'>
                                <Link className='listcontent' href='https://docs.polarlab.app' prefetch={false}>
                                    Docs
                                </Link>
                            </li>
                            <li className='listcontent'>
                                <Link className='listcontent' href='/status' prefetch={false}>
                                    Status
                                </Link>
                            </li>
                            <li className='listcontent'>
                                <Link className='listcontent' href='/tracker' prefetch={false}>
                                    Issue Tracker
                                </Link>
                            </li>
                            <li className='listcontent'>
                                <Link className='listcontent' href='/contact' prefetch={false}>
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className='list'>
                        <ul className='listcontainer'>
                            <li className='listheader'>
                                <p className='listheader'>Legal</p>
                            </li>
                            <li className='listcontent'>
                                <Link className='listcontent' href='/privacy' prefetch={false}>
                                    Privacy Policy
                                </Link>
                            </li>
                            <li className='listcontent'>
                                <Link className='listcontent' href='/terms' prefetch={false}>
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='footer2'>
                <a className='copyr' href='https://polarlab.app'>
                    ©️ 2024 Polar Lab
                </a>
                <div className='status'>
                    <Link className='product' href='/status' prefetch={false}>
                        Polaris Status:
                    </Link>
                    <Image
                        src='https://cdn.polarlab.app/src/main/img/discordlogo.png'
                        className='statusicon'
                        alt='alt'
                        width='128'
                        height='128'
                    />
                    <Link className='statustext' href='/status' prefetch={false}>
                        Online
                    </Link>
                </div>
                <div className='socials'>
                    <a href='/discord'>
                        <Image
                            src='https://cdn.polarlab.app/src/main/img/discordlogo.png'
                            className='discordlogo'
                            alt='alt'
                            width='140'
                            height='100'
                        />
                    </a>
                    <a href='https://github.com/polarlab-app'>
                        <Image
                            src='https://cdn.polarlab.app/src/main/img/githublogo.png'
                            className='discordlogo'
                            alt='alt'
                            width='128'
                            height='128'
                        />
                    </a>
                </div>
            </div>
        </footer>
    );
}
