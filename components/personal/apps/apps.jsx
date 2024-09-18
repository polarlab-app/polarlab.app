'use client';
import styles from '@css/personal/apps.module.css';
import Image from 'next/image';
import CreateApp from './createApp';
import { useState, useEffect } from 'react';
import findApps from '@/lib/personal/apps/findApps';
import deleteApp from '@/lib/personal/apps/deleteApp';
import updateApp from '@/lib/personal/apps/updateApp';
import { triggerToast } from '@/components/core/toastNotifications';

export default function Apps() {
    const [apps, setApps] = useState([]);
    const [showCreateApp, setShowCreateApp] = useState(false);
    const [editAppIndex, setEditAppIndex] = useState(null);
    const [appName, setAppName] = useState('');
    const [redirectURIs, setRedirectURIs] = useState([]);
    const [scopes, setScopes] = useState([]);
    const [appIcon, setAppIcon] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        findApps().then((data) => setApps(JSON.parse(data)));
    }, []);

    const handleEditClick = (index, app) => {
        setEditAppIndex(index);
        setAppName(app.name);
        setRedirectURIs(app.redirectURIs);
        setScopes(app.scopes);
        setPreview(`https://cdn.polarlab.app/api/fetch/apps/avatars/${app.id}/webp`);
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

    const handleScopeChange = (scope) => {
        if (scopes.includes(scope)) {
            setScopes(scopes.filter((s) => s !== scope));
        } else {
            setScopes([...scopes, scope]);
        }
    };

    const addRedirectURI = () => {
        setRedirectURIs([...redirectURIs, '']);
    };

    const removeRedirectURI = (index) => {
        const newRedirectURIs = redirectURIs.filter((_, i) => i !== index);
        setRedirectURIs(newRedirectURIs);
    };

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;
    };

    const handleSave = async () => {
        if (editAppIndex !== null) {
            const appID = apps[editAppIndex].id;
            const res = JSON.parse(await updateApp(appID, appName, appIcon, redirectURIs, scopes));
            triggerToast(res.h, res.d, res.c);
            if (res.s) {
                setEditAppIndex(null);
                setAppName('');
                setRedirectURIs([]);
                setAppIcon('');
                setPreview('');
                setEditAppIndex(null);
                findApps().then((data) => setApps(JSON.parse(data)));
            }
        }
    };

    const handleDelete = async (id) => {
        const res = JSON.parse(await deleteApp(id));
        triggerToast(res.h, res.d, res.c);
        if (res.s) {
            setApps(apps.filter((app) => app.id !== id));
        }
    };

    const availableScopes = ['email', 'authorizedApps', 'connections'];

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
                                                    className={styles.appIcon}
                                                />
                                                <label className={styles.editWrapper} htmlFor='profilePicture'>
                                                    <i className={`${styles.editIcon} icon-pen`}></i>
                                                </label>
                                                <input
                                                    type='file'
                                                    id='profilePicture'
                                                    className={styles.fileInput}
                                                    onChange={handleFileChange}
                                                ></input>
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
                                            {redirectURIs.map((uri, index) => (
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
                                            <div className={styles.scopes}>
                                                {availableScopes.map((scope, index) => (
                                                    <div key={index} className={styles.scope}>
                                                        <label className={styles.scopeContainer}>
                                                            <input
                                                                type='checkbox'
                                                                className={styles.hidden}
                                                                onChange={() => handleScopeChange(scope)}
                                                                checked={scopes.includes(scope)}
                                                            />
                                                            <span className={styles.toggle}>
                                                                <span className={styles.innerToggle}></span>
                                                            </span>
                                                        </label>
                                                        <p className={styles.scopeLabel}>
                                                            {scope.charAt(0).toUpperCase() +
                                                                scope.slice(1).toLowerCase()}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className={styles.buttonContainer}>
                                                <button className={styles.saveButton} onClick={handleSave}>
                                                    Save Changes
                                                </button>
                                                <button
                                                    className={styles.deleteButton}
                                                    onClick={() => handleDelete(app.id)}
                                                >
                                                    Delete App
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className={styles.top}>
                                            <Image
                                                src={`https://cdn.polarlab.app/api/fetch/apps/avatars/${app.id}/webp`}
                                                alt={`${app.name} Logo`}
                                                width={128}
                                                height={128}
                                                className={styles.logo}
                                            />
                                            <h2>
                                                {app.name} <span className={styles.appID}>({app.id})</span>
                                            </h2>
                                            <button
                                                className={styles.button}
                                                onClick={() => handleEditClick(index, app)}
                                            >
                                                <i className={`${styles.icon} icon-check-double`}></i>Edit App
                                            </button>
                                        </div>
                                        <div className={styles.middle}>
                                            <ul className={styles.info}>
                                                <li className={styles.infoItem}>Users: {app.userCount}</li>
                                                <li className={styles.infoItem}>
                                                    Redirect URIs: {app.redirectURIs.join(', ')}
                                                </li>
                                                <li className={styles.infoItem}>Scopes: {app.scopes.join(', ')}</li>
                                                <li className={styles.infoItem}>
                                                    Date Created: {formatDate(app.date)}
                                                </li>
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
