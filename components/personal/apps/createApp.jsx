import styles from '@css/personal/createApp.module.css';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import createApp from '@lib/personal/apps/createApp';
import { triggerToast } from '@/components/core/toastNotifications';

export default function CreateApp({ closeButton }) {
    const [appName, setAppName] = useState('');
    const [redirectURIs, setRedirectURIs] = useState([]);
    const [appIcon, setAppIcon] = useState(null);
    const [scopes, setScopes] = useState([]);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (appIcon && typeof appIcon === 'object') {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                setAppIcon(reader.result.split(',')[1]);
            };
            reader.readAsDataURL(appIcon);
        }
    }, [appIcon]);

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

    const handleSubmit = async () => {
        const res = JSON.parse(await createApp(appName, redirectURIs, appIcon, scopes));
        triggerToast(res.h, res.d, res.c);
        console.log(res);
        if (res.s) {
            closeButton();
        }
    };

    const handleScopeChange = (scope) => {
        if (scopes.includes(scope)) {
            setScopes(scopes.filter((s) => s !== scope));
        } else {
            setScopes([...scopes, scope]);
        }
    };
    const handleCloseModal = () => {
        document.querySelector(`.${styles.modal}`).classList.add(`${styles.active}`);
        document.querySelector(`.${styles.wrapper}`).classList.add(`${styles.active}`);

        setTimeout(() => {
            closeButton();
        }, 800);
    };

    const availableScopes = ['email', 'authorizedApps', 'connections'];

    return (
        <div className={styles.wrapper}>
            <div className={styles.modal}>
                <div className={styles.modalheader}>
                    <h2 className={styles.header}>Create New App</h2>
                    <i className={`${styles.close} icon-xmark`} onClick={handleCloseModal}></i>
                </div>
                <div className={styles.modalbody}>
                    <div className={styles.inputcontainer}>
                        <p className={styles.label}>App Icon</p>
                        <div className={styles.iconcontainer}>
                            <label htmlFor='appicon' className={styles.filelabel}>
                                Upload Icon (5mb, 512x512px recommended)
                            </label>
                            {preview && (
                                <Image
                                    src={preview}
                                    alt='App Icon'
                                    width={512}
                                    height={512}
                                    className={styles.preview}
                                />
                            )}
                            <input
                                type='file'
                                id='appicon'
                                placeholder='App Name'
                                className={styles.fileinput}
                                onChange={handleFileChange}
                                accept='image/*'
                            />
                        </div>
                    </div>
                    <div className={styles.inputcontainer}>
                        <p className={styles.label}>App Name</p>
                        <input
                            type='text'
                            placeholder='App Name'
                            className={styles.input}
                            onChange={(e) => setAppName(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputcontainer}>
                        <p className={styles.label}>Redirect URIs </p>
                        {redirectURIs.map((uri, index) => (
                            <div key={index} className={styles.redirecturi}>
                                <input
                                    type='text'
                                    placeholder={`https://example.com/callback${index + 1}`}
                                    className={styles.input}
                                    value={uri}
                                    onChange={(e) => handleRedirectURIChange(index, e.target.value)}
                                />
                                <button className={styles.removeButton} onClick={() => removeRedirectURI(index)}>
                                    x
                                </button>
                            </div>
                        ))}
                        <button className={styles.addButton} onClick={addRedirectURI}>
                            Add URI
                        </button>
                    </div>
                    <div className={styles.inputcontainer}>
                        <p className={styles.label}>Scopes </p>

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
                                    {scope.charAt(0).toUpperCase() + scope.slice(1).toLowerCase()}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <button className={styles.create} onClick={handleSubmit}>
                    Create
                </button>
            </div>
        </div>
    );
}
