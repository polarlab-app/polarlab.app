import Link from 'next/link';

export default function BlogPost() {
    return (
        <>
            <div className='postcontainer'>
                <Link className='home' href='/blog'>
                    <img className='homeicon' src='https://cdn.polarlab.app/src/icons/colorless/home.png' />
                </Link>
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
                <img className='postbanner' src='https://cdn.polarlab.app/src/banners/polarisv2.png' />
            </div>
        </>
    );
}
