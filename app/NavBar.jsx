import '../src/css/core/navbar.css';
import Link from 'next/link';
import Image from 'next/image';

export default function NavBar() {
    return (
        <nav>
            <div className='navlinkcontainer'>
                <Image
                    className='logo'
                    src='https://cdn.polarlab.app/src/img/polarlogo.png'
                    alt='alt'
                    width='128'
                    height='128'
                />
                <Link className='logolink' href='https://polarlab.app/' prefetch={false}>
                    Polar Lab
                </Link>
                <Link className='navlink' href='/'>
                    Home
                </Link>
                <Link className='navlink' href='https://docs.polarlab.app' prefetch={false}>
                    Docs
                </Link>
                <Link className='navlink' href='/blog' prefetch={false}>
                    Blog
                </Link>
                <Link className='navlink' href='/discord' prefetch={false}>
                    Discord
                </Link>
                <Link className='polarplus' href='/plus' prefetch={false}>
                    Polar+
                </Link>
            </div>
            {/*(<div className='border-bottom'></div>/*/}
        </nav>
    );
}
