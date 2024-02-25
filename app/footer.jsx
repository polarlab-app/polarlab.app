import '../src/css/core/footer.css';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className='footercontainer'>
            <div className='footer'>
                <div className='footertop'>
                    <img src='https://cdn.polarlab.app/src/img/polarlogo.png' className='footerlogo' alt='alt' />
                    <h1 className='footerheader'>Polar Lab</h1>
                    <a className='dbtn' href='/discord'>
                        Discord
                    </a>
                </div>
                <div className='lists'>
                    <div className='list'>
                        <ul className='listcontainer'>
                            <li className='listheader'>
                                <p className='listheader'>Products</p>
                            </li>
                            <li className='listcontent'>
                                <Link className='listcontent' href='/polaris'>
                                    Polaris V2
                                </Link>
                            </li>
                            <li className='listcontent'>
                                <Link className='listcontent' href='/polarmc'>
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
                                <Link className='listcontent' href='/blog'>
                                    Blog
                                </Link>
                            </li>
                            <li className='listcontent'>
                                <Link className='listcontent' href='https://docs.polarlab.app'>
                                    Docs
                                </Link>
                            </li>
                            <li className='listcontent'>
                                <Link className='listcontent' href='/status'>
                                    Status
                                </Link>
                            </li>
                            <li className='listcontent'>
                                <Link className='listcontent' href='/contact'>
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
                                <Link className='listcontent' href='/privacy'>
                                    Privacy Policy
                                </Link>
                            </li>
                            <li className='listcontent'>
                                <Link className='listcontent' href='/terms'>
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='footer2'>
                <a className='copyr' href='https://polarlab.app'>
                    ©️ 2023 Polar Lab
                </a>
                <div className='status'>
                    <Link className='product' href='/status'>
                        Polaris Status:
                    </Link>
                    <img src='https://cdn.polarlab.app/src/main/img/discordlogo.png' className='statusicon' alt='alt' />
                    <Link className='statustext' href='/status'>
                        Online
                    </Link>
                </div>
                <div className='socials'>
                    <a href='/discord'>
                        <img
                            src='https://cdn.polarlab.app/src/main/img/discordlogo.png'
                            className='discordlogo'
                            alt='alt'
                        />
                    </a>
                    <a href='https://github.com/polarlab-app'>
                        <img
                            src='https://cdn.polarlab.app/src/main/img/githublogo.png'
                            className='discordlogo'
                            alt='alt'
                        />
                    </a>
                </div>
            </div>
        </footer>
    );
}
