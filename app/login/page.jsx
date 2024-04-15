'use client';

import '@css/login.css';
import Link from 'next/link';
import React, { useState } from 'react';

import login from '@lib/auth/login';

/*export const metadata = {
    title: 'Polar Lab | Login',
    description: 'The official Polar Lab login page',
};*/

export default function Page() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const loginStatus = await login(username, password);

        if (loginStatus != 'success') {
            setError(loginStatus);
            return;
        }

        setError(null);
        setSuccess('Login Successful!');
    };

    return (
        <div className='main'>
            <div className='logincontainer'>
                <form className='loginwrapper' onSubmit={handleSubmit}>
                    <div className='logintextcontainer'>
                        <div className='logintexttopcontainer'>
                            <img
                                className='logo'
                                src='https://cdn.polarlab.app/src/img/polarlogo.png'
                                alt='polarlogo'></img>
                            <p className='loginheader'>Log In to Polar Lab</p>
                        </div>
                        <div className='logininputcontainer'>
                            {success && <p className='loginsuccess'>{success}</p>}
                            {error && <p className='loginerror'>{error}</p>}
                            <p className='inputheader'>Username</p>
                            <input
                                type='text'
                                className='logininput'
                                placeholder='Username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required></input>
                            <p className='inputheader'>Password</p>
                            <input
                                type='password'
                                className='logininput'
                                placeholder='************'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required></input>
                        </div>
                    </div>
                    <div className='loginbuttoncontainer'>
                        <p className='registertext'>
                            Dont have an account? Register <Link href='/login/register'>here</Link>!
                        </p>
                        <button className='loginbutton' type='submit'>
                            Log In
                        </button>
                        <Link
                            className='loginbutton discordlogin'
                            href='https://discord.com/api/oauth2/authorize?client_id=1065350226757554237&response_type=code&redirect_uri=https%3A%2F%2Flocalhost%3A3000%2Flogin%2Fcallback&scope=identify+guilds'>
                            Log in with Discord
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
