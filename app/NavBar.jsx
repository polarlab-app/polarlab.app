import '../src/css/core/navbar.css';
import Link from 'next/link';

export default function NavBar() {
    return (
        <nav>
            <div className='navlinkcontainer'>
                <img className='logo' src='https://cdn.polarlab.app/src/img/polarlogo.png' alt='alt' />
                <Link className='logolink' href='https://polarlab.app/'>
                    Polar Lab
                </Link>
                <Link className='navlink' href='/'>
                    Home
                </Link>
                <Link className='navlink' href='https://docs.polarlab.app'>
                    Docs
                </Link>
                <Link className='navlink' href='/blog'>
                    Blog
                </Link>
                <Link className='navlink' href='/discord'>
                    Discord
                </Link>
                <Link className='polarplus' href='/plus'>
                    Polar+
                </Link>
            </div>
            {/*(<div className='border-bottom'></div>/*/}
        </nav>
    );
}
