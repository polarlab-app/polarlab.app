import '../../src/css/login.css';
import Link from 'next/link';

export default function Page() {
    return (
        <>
            <div className='logincontainer'>
                <div className='loginwrapper'>
                    <div className='logintextcontainer'>
                        <div className='logintexttopcontainer'>
                            <img className='logo' src='https://cdn.polarlab.app/src/img/polarlogo.png'></img>
                            <p className='loginheader'>Log In to Polar Lab</p>
                        </div>
                        <div className='logininputcontainer'>
                            <p className='inputheader'>Username</p>
                            <input type='text' className='logininput' placeholder='Username'></input>
                            <p className='inputheader'>Password</p>
                            <input type='text' className='logininput' placeholder='********'></input>
                        </div>
                    </div>

                    <div className='loginbuttoncontainer'>
                        <button className='loginbutton' onClick=''>
                            Log In
                        </button>
                        <Link
                            className='loginbutton discordlogin'
                            href='https://discord.com/api/oauth2/authorize?client_id=1065350226757554237&response_type=code&redirect_uri=https%3A%2F%2Flocalhost%3A3000%2Flogin%2Fcallback&scope=identify+guilds'>
                            Log in with Discord
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
