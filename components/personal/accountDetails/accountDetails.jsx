'use client';
import styles from '@css/personal/accountDetails.module.css';
import Image from 'next/image';
import findUser from '@/lib/personal/findUser';
import { useState, useEffect } from 'react';
import EnterPassword from './enterPassword';

export default function AccountDetails() {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [isChanged, setIsChanged] = useState(false);
    const [preview, setPreview] = useState(null);
    const [appIcon, setAppIcon] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            const userAccount = JSON.parse(await findUser());
            setUser(userAccount);
            setUsername(userAccount.username);
            setEmail(userAccount.email);
        };
        fetchUser();
    }, []);

    useEffect(() => {
        if (user) {
            setIsChanged(username !== user.username || email !== user.email || password !== '' || appIcon !== '');
        }
    }, [username, email, password, user, appIcon]);

    const handleSaveChanges = () => {
        setShowPasswordModal(true);
    };

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size <= 5242880) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                setAppIcon(reader.result.split(',')[1]);
            };
            reader.readAsDataURL(file);
        } else {
            alert('>5mb == bad bad boi');
        }
    };

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <h1 className={styles.heading}>Account Details</h1>
                {isChanged && (
                    <button className={styles.button} onClick={handleSaveChanges}>
                        Save Changes
                    </button>
                )}
            </div>
            <div className={styles.account}>
                <div className={styles.iconContainer}>
                    <Image
                        src={
                            preview
                                ? preview
                                : user
                                ? `https://cdn.polarlab.app/api/fetch/users/avatars/${user.id}/webp`
                                : 'https://cdn.polarlab.app/api/fetch/img/polarlogo/png'
                        }
                        width={512}
                        height={512}
                        alt='Profile Picture'
                        className={styles.icon}
                    />
                    <label className={styles.editWrapper} htmlFor='profilePicture'>
                        <i className={`${styles.editIcon} icon-grid-2`}></i>
                    </label>
                    <input
                        type='file'
                        id='profilePicture'
                        className={styles.fileInput}
                        onChange={handleFileChange}
                    ></input>
                </div>
                <div className={styles.inputs}>
                    <div className={styles.inputcontainer}>
                        <p className={styles.label}>Username</p>
                        <input
                            type='text'
                            placeholder='New Username'
                            value={username}
                            onChange={handleInputChange(setUsername)}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.inputcontainer}>
                        <p className={styles.label}>Email</p>
                        <input
                            type='text'
                            placeholder='New Email'
                            value={email}
                            onChange={handleInputChange(setEmail)}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.inputcontainer}>
                        <p className={styles.label}>Password</p>
                        <input
                            type='password'
                            placeholder='New Password'
                            value={password}
                            onChange={handleInputChange(setPassword)}
                            className={styles.input}
                        />
                    </div>
                </div>
            </div>
            {showPasswordModal && (
                <EnterPassword
                    username={username}
                    password={password}
                    email={email}
                    appIcon={appIcon}
                    close={() => setShowPasswordModal(false)}
                />
            )}
        </div>
    );
}
