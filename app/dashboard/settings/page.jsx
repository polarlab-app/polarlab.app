import styles from '@css/dashboard/settings.module.css';
import TopBar from '@/components/dashboard/topbar';

export default function Page() {
    return (
        <>
            <TopBar type='settings' />
            <div className='dashboardwrapper'>
                <div className={styles.togglegroup}>
                    <div className={styles.toggleswitchcontainer}>
                        <div className={styles.toggleswitchtext}>
                            <p className={styles.toggleswitchheader}>AI Functionality</p>
                            <p className={styles.toggleswitchdescription}>
                                Whether to enable AI empowered analytics for your server
                            </p>
                        </div>
                        <label className={styles.togglecontainer}>
                            <input type='checkbox' className={styles.hidden}></input>
                            <span className={styles.toggle}>
                                <span className={styles.innertoggle}></span>
                            </span>
                        </label>
                    </div>
                </div>
                <div className={styles.togglegroup}>
                    <div className={styles.toggleswitchcontainer}>
                        <div className={styles.toggleswitchtext}>
                            <p className={styles.toggleswitchheader}>AI Functionality</p>
                            <p className={styles.toggleswitchdescription}>
                                Whether to enable AI empowered analytics for your server
                            </p>
                        </div>
                        <label className={styles.togglecontainer}>
                            <input type='checkbox' className={styles.hidden}></input>
                            <span className={styles.toggle}>
                                <span className={styles.innertoggle}></span>
                            </span>
                        </label>
                    </div>

                    <div className={styles.toggleswitchcontainer}>
                        <div className={styles.toggleswitchtext}>
                            <p className={styles.toggleswitchheader}>AI Functionality</p>
                            <p className={styles.toggleswitchdescription}>
                                Whether to enable AI empowered analytics for your server
                            </p>
                        </div>
                        <label className={styles.togglecontainer}>
                            <input type='checkbox' className={styles.hidden}></input>
                            <span className={styles.toggle}>
                                <span className={styles.innertoggle}></span>
                            </span>
                        </label>
                    </div>
                    <div className={styles.toggleswitchcontainer}>
                        <div className={styles.toggleswitchtext}>
                            <p className={styles.toggleswitchheader}>AI Functionality</p>
                            <p className={styles.toggleswitchdescription}>
                                Whether to enable AI empowered analytics for your server
                            </p>
                        </div>
                        <label className={styles.togglecontainer}>
                            <input type='checkbox' className={styles.hidden}></input>
                            <span className={styles.toggle}>
                                <span className={styles.innertoggle}></span>
                            </span>
                        </label>
                    </div>
                    <div className={styles.toggleswitchcontainer}>
                        <div className={styles.toggleswitchtext}>
                            <p className={styles.toggleswitchheader}>AI Functionality</p>
                            <p className={styles.toggleswitchdescription}>
                                Whether to enable AI empowered analytics for your server
                            </p>
                        </div>
                        <label className={styles.togglecontainer}>
                            <input type='checkbox' className={styles.hidden}></input>
                            <span className={styles.toggle}>
                                <span className={styles.innertoggle}></span>
                            </span>
                        </label>
                    </div>
                </div>
                <div className={styles.togglegroup}>
                    <div className={styles.toggleswitchcontainer}>
                        <div className={styles.toggleswitchtext}>
                            <p className={styles.toggleswitchheader}>AI Functionality</p>
                            <p className={styles.toggleswitchdescription}>
                                Whether to enable AI empowered analytics for your server
                            </p>
                        </div>
                        <label className={styles.togglecontainer}>
                            <input type='checkbox' className={styles.hidden}></input>
                            <span className={styles.toggle}>
                                <span className={styles.innertoggle}></span>
                            </span>
                        </label>
                    </div>
                    <div className={styles.toggleswitchcontainer}>
                        <div className={styles.toggleswitchtext}>
                            <p className={styles.toggleswitchheader}>AI Functionality</p>
                            <p className={styles.toggleswitchdescription}>
                                Whether to enable AI empowered analytics for your server
                            </p>
                        </div>
                        <label className={styles.togglecontainer}>
                            <input type='checkbox' className={styles.hidden}></input>
                            <span className={styles.toggle}>
                                <span className={styles.innertoggle}></span>
                            </span>
                        </label>
                    </div>
                    <div className={styles.toggleswitchcontainer}>
                        <div className={styles.toggleswitchtext}>
                            <p className={styles.toggleswitchheader}>AI Functionality</p>
                            <p className={styles.toggleswitchdescription}>
                                Whether to enable AI empowered analytics for your server
                            </p>
                        </div>
                        <label className={styles.togglecontainer}>
                            <input type='checkbox' className={styles.hidden}></input>
                            <span className={styles.toggle}>
                                <span className={styles.innertoggle}></span>
                            </span>
                        </label>
                    </div>
                    <div className={styles.toggleswitchcontainer}>
                        <div className={styles.toggleswitchtext}>
                            <p className={styles.toggleswitchheader}>AI Functionality</p>
                            <p className={styles.toggleswitchdescription}>
                                Whether to enable AI empowered analytics for your server
                            </p>
                        </div>
                        <label className={styles.togglecontainer}>
                            <input type='checkbox' className={styles.hidden}></input>
                            <span className={styles.toggle}>
                                <span className={styles.innertoggle}></span>
                            </span>
                        </label>
                    </div>
                    <div className={styles.toggleswitchcontainer}>
                        <div className={styles.toggleswitchtext}>
                            <p className={styles.toggleswitchheader}>AI Functionality</p>
                            <p className={styles.toggleswitchdescription}>
                                Whether to enable AI empowered analytics for your server
                            </p>
                        </div>
                        <label className={styles.togglecontainer}>
                            <input type='checkbox' className={styles.hidden}></input>
                            <span className={styles.toggle}>
                                <span className={styles.innertoggle}></span>
                            </span>
                        </label>
                    </div>
                </div>
                <div className={styles.savecontainer}>
                    <p className={styles.savetext}>Do you want to save your changes?</p>
                    <div className={styles.savebuttoncontainer}>
                        <button className={styles.savebutton + ' ' + styles.cancel}>Cancel</button>
                        <button className={styles.savebutton + ' ' + styles.save}>Save</button>
                    </div>
                </div>
            </div>
        </>
    );
}
