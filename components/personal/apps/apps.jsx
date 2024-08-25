'use client';
import styles from '@css/personal/apps.module.css';
import Image from 'next/image';
import CreateApp from './createApp';
import { useState, useEffect } from 'react';
import findApps from '@/lib/personal/apps/findApps';

export default function Apps() {
    const [apps, setApps] = useState([]);
    const [showCreateApp, setShowCreateApp] = useState(false);
    const [editAppIndex, setEditAppIndex] = useState(null);
    const [appName, setAppName] = useState('');
    const [redirectURIs, setRedirectURIs] = useState([]);
    const [appIcon, setAppIcon] = useState('');
    const [preview, setPreview] = useState('');

    useEffect(() => {
        findApps().then((data) => setApps(JSON.parse(data)));
    }, []);

    const handleEditClick = (index, app) => {
        setEditAppIndex(index);
        setAppName(app.name);
        setRedirectURIs(app.redirectURIs);
        setAppIcon(`https://cdn.polarlab.app/api/fetch/apps/${app.id}/webp`);
        setPreview(`https://cdn.polarlab.app/api/fetch/apps/${app.id}/webp`);
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

    const handleRedirectURIChange = (index, value) => {
        const newRedirectURIs = [...redirectURIs];
        newRedirectURIs[index] = value;
        setRedirectURIs(newRedirectURIs);
    };

    const addRedirectURI = () => {
        setRedirectURIs([...redirectURIs, '']);
    };

    const removeRedirectURI = (index) => {
        const newRedirectURIs = redirectURIs.filter((_, i) => i !== index);
        setRedirectURIs(newRedirectURIs);
    };

    const handleSave = () => {
        // Save logic here
        alert('App saved successfully');
    };

    const handleDelete = () => {
        // Delete logic here
        alert('App deleted successfully');
    };

    return (
        <>
            {showCreateApp && <CreateApp closeButton={() => setShowCreateApp(false)} />}
            <div className={styles.main}>
                <div className={styles.header}>
                    <h1 className={styles.heading}>Applications</h1>
                    <button className={styles.create} onClick={() => setShowCreateApp(true)}>
                        <i className={`${styles.icon} icon-check-double`}></i>Create App
                    </button>
                </div>
                <div className={styles.apps}>
                    {apps.length > 0 ? (
                        apps.map((app, index) => (
                            <div key={index} className={`${styles.app} ${editAppIndex === index ? styles.active : ''}`}>
                                {editAppIndex === index ? (
                                    <>
                                        <div className={styles.editLeft}>
                                            <div className={styles.iconcontainer}>
                                                <label htmlFor='appicon' className={styles.filelabel}>
                                                    <Image
                                                        src={preview}
                                                        alt='App Icon'
                                                        width={512}
                                                        height={512}
                                                        className={styles.editLogo}
                                                    />
                                                </label>
                                                <input
                                                    type='file'
                                                    id='appicon'
                                                    className={styles.fileinput}
                                                    onChange={handleFileChange}
                                                    accept='image/*'
                                                />
                                            </div>
                                            <div className={styles.inputContainer}>
                                                <p className={styles.inputLabel}>App Name</p>
                                                <input
                                                    type='text'
                                                    placeholder='App Name'
                                                    className={styles.input}
                                                    value={appName}
                                                    onChange={(e) => setAppName(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className={styles.editMiddle}>
                                            <p className={styles.inputLabel}>Redirect URIs</p>
                                            {app.redirectURIs.map((uri, index) => (
                                                <div key={index} className={styles.redirecturi}>
                                                    <input
                                                        type='text'
                                                        placeholder={`https://example.com/callback${index + 1}`}
                                                        className={styles.input}
                                                        value={uri}
                                                        onChange={(e) => handleRedirectURIChange(index, e.target.value)}
                                                    />
                                                    <button
                                                        className={styles.removeButton}
                                                        onClick={() => removeRedirectURI(index)}
                                                    >
                                                        x
                                                    </button>
                                                </div>
                                            ))}
                                            <button className={styles.addButton} onClick={addRedirectURI}>
                                                Add URI
                                            </button>
                                        </div>
                                        <div className={styles.editRight}>
                                            <button className={styles.saveButton} onClick={handleSave}>
                                                Save Changes
                                            </button>
                                            <button className={styles.deleteButton} onClick={handleDelete}>
                                                Delete App
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className={styles.top}>
                                            <Image
                                                src={`https://cdn.polarlab.app/api/fetch/apps/${app.id}/webp`}
                                                alt={`${app.name} Logo`}
                                                width={128}
                                                height={128}
                                                className={styles.logo}
                                            />
                                            <h2>{app.name}</h2>
                                            <button
                                                className={styles.button}
                                                onClick={() => handleEditClick(index, app)}
                                            >
                                                <i className={`${styles.icon} icon-check-double`}></i>Edit App
                                            </button>
                                        </div>
                                        <div className={styles.middle}>
                                            <ul className={styles.info}>
                                                <li className={styles.infoItem}>App ID: {app.id}</li>
                                                <li className={styles.infoItem}>Users: {app.userCount}</li>
                                                <li className={styles.infoItem}>
                                                    Redirect URIs: {app.redirectURIs.join(', ')}
                                                </li>
                                                <li className={styles.infoItem}>Date Created: {app.dateCreated}</li>
                                            </ul>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No apps found</p>
                    )}
                </div>
            </div>
        </>
    );
}
