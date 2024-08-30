import styles from '@css/personal/createApp.module.css';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import createApp from '@lib/personal/apps/createApp';

export default function CreateApp({ closeButton }) {
    const [appName, setAppName] = useState('');
    const [redirectURIs, setRedirectURIs] = useState(['']);
    const [appIcon, setAppIcon] = useState(null);
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
        try {
            await createApp(appName, redirectURIs, appIcon);
            alert('App created successfully');
            closeButton();
        } catch (error) {
            alert('Failed to create app, the developer fucked up lol');
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.modal}>
                <div className={styles.modalheader}>
                    <h2 className={styles.header}>Create New App</h2>
                    <p className={styles.close} onClick={closeButton}>
                        Close
                    </p>
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
                    </div>
                </div>
                <button className={styles.create} onClick={handleSubmit}>
                    Create
                </button>
            </div>
        </div>
    );
}
