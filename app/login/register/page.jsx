'use client';

import '../../../src/css/login.css';
import Link from 'next/link';
import React, { useState } from 'react';

import validateUsername from '@/lib/auth/validation/validateUsername';
import validatePassword from '@/lib/auth/validation/validatePassword';
import register from '@/lib/auth/register';

export default function Page() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const usernameResponse = await validateUsername(username);
        const passwordReponse = await validatePassword(password);
        if (usernameResponse == 'fail') {
            setError('Username Unavailable');
            return;
        }
        if (passwordReponse != 'success') {
            setError(passwordReponse);
            return;
        }

        setError(null);
        setSuccess('Username available!');

        const registerResponse = await register(username, password);

        if (registerResponse == 'fail') {
            setError('An internal error has occured! Please try again!');
        }

        setSuccess('Registration Successful! Please login!');
    };

    return (
        <div className='main'>
            <div className='logincontainer'>
                <form className='loginwrapper' onSubmit={handleSubmit}>
                    <div className='logintextcontainer'>
                        <div className='logintexttopcontainer'>
                            <img className='logo' src='https://cdn.polarlab.app/src/img/polarlogo.png'></img>
                            <p className='loginheader'>Register to Polar Lab</p>
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
                            Have an account? Login <Link href='/login'>here</Link>!
                        </p>
                        <button className='loginbutton' type='submit'>
                            Register
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
