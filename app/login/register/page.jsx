'use client';

import '../../../src/css/login.css';
import Link from 'next/link';
import React, { useState } from 'react';

export default function Page() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const validatePassword = (password) => {
        const lengthError = 'Password must be at least 12 characters long';
        const upperCaseError = 'Password must include an uppercase letter';
        const lowerCaseError = 'Password must include a lowercase letter';
        const digitError = 'Password must include a number';
        const symbolError = 'Password must include a special charecter';

        if (password.length < 12) {
            return lengthError;
        } else if (!/[A-Z]/.test(password)) {
            return upperCaseError;
        } else if (!/[a-z]/.test(password)) {
            return lowerCaseError;
        } else if (!/\d/.test(password)) {
            return digitError;
        } else if (!/[!@#$%^&*()_+`~{}|:;<>?,.]/.test(password)) {
            return symbolError;
        }

        return null;
    };

    const validateUsername = async (username) => {
        const response = await fetch('/api/login/usernamecheck', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username }),
        });

        const JSONresponse = await response.json();
        const status = JSONresponse.status;

        if (status == 'available') {
            return null;
        }
        return 'Username unavailable';
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const passwordValidation = await validatePassword(password);
        const usernameValidation = await validateUsername(username);
        if (passwordValidation) {
            setError(passwordValidation);
            setSuccess(null);

            return;
        } else if (usernameValidation) {
            setError(usernameValidation);
            setSuccess(null);
            return;
        }
        setError(null);
        setSuccess('Username available!');

        const loginResponse = await fetch('/api/login/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

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
