'use client';
import styles from '@css/dashboard/settings.module.css';
import TopBar from '@components/dashboard/topbar';
import { useGuild } from '../guildContext';
import CheckboxInput from '@/components/dashboard/inputs/checkbox';
import { useState } from 'react';
import SaveButton from '@/components/dashboard/saveButton';
import DiscardButton from '@/components/dashboard/discardButton';
import saveData from '@/lib/dashboard/saveData';

export default function Page() {
    const { selectedGuild, setSelectedGuild } = useGuild();
    const [newData, setNewData] = useState({});

    const handleCheckboxChange = (id, value) => {
        const updatedCheckboxValues = { ...newData };
        updatedCheckboxValues[id] = value;
        setNewData(updatedCheckboxValues);
    };

    const discardChanges = () => {
        setNewData({});
    };

    const saveTrigger = async () => {
        const response = await saveData(newData || 0, selectedGuild.id || 0);
        if (response === 'success') {
            setNewData({});
        } else {
            alert('fail');
        }
    };

    return (
        <div className="dashboard">
            <TopBar type="settings">
                {Object.keys(newData).length > 0 && (
                    <>
                        <DiscardButton onClick={() => discardChanges()} />
                        <SaveButton onClick={() => saveTrigger()} />
                    </>
                )}
            </TopBar>

            <div className="dashboardwrapper">
                <div className={styles.togglegroup}>
                    <CheckboxInput
                        id="ai-functionality"
                        value={true}
                        onChange={(e) =>
                            handleCheckboxChange(e.target.id, e.target.checked)
                        }
                    />
                </div>
                <div className={styles.togglegroup}>
                    <CheckboxInput
                        id="ai-functionality2"
                        value={true}
                        onChange={(e) =>
                            handleCheckboxChange(e.target.id, e.target.checked)
                        }
                    />

                    <CheckboxInput
                        id="ai-functionality3"
                        value={true}
                        onChange={(e) =>
                            handleCheckboxChange(e.target.id, e.target.checked)
                        }
                    />
                    <div className={styles.toggleswitchcontainer}>
                        <div className={styles.toggleswitchtext}>
                            <p className={styles.toggleswitchheader}>
                                AI Functionality
                            </p>
                            <p className={styles.toggleswitchdescription}>
                                Whether to enable AI empowered analytics for
                                your server
                            </p>
                        </div>
                        <label className={styles.togglecontainer}>
                            <input
                                type="checkbox"
                                className={styles.hidden}
                            ></input>
                            <span className={styles.toggle}>
                                <span className={styles.innertoggle}></span>
                            </span>
                        </label>
                    </div>
                    <div className={styles.toggleswitchcontainer}>
                        <div className={styles.toggleswitchtext}>
                            <p className={styles.toggleswitchheader}>
                                AI Functionality
                            </p>
                            <p className={styles.toggleswitchdescription}>
                                Whether to enable AI empowered analytics for
                                your server
                            </p>
                        </div>
                        <label className={styles.togglecontainer}>
                            <input
                                type="checkbox"
                                className={styles.hidden}
                            ></input>
                            <span className={styles.toggle}>
                                <span className={styles.innertoggle}></span>
                            </span>
                        </label>
                    </div>
                </div>
                <div className={styles.togglegroup}>
                    <div className={styles.toggleswitchcontainer}>
                        <div className={styles.toggleswitchtext}>
                            <p className={styles.toggleswitchheader}>
                                AI Functionality
                            </p>
                            <p className={styles.toggleswitchdescription}>
                                Whether to enable AI empowered analytics for
                                your server
                            </p>
                        </div>
                        <label className={styles.togglecontainer}>
                            <input
                                type="checkbox"
                                className={styles.hidden}
                            ></input>
                            <span className={styles.toggle}>
                                <span className={styles.innertoggle}></span>
                            </span>
                        </label>
                    </div>
                    <div className={styles.toggleswitchcontainer}>
                        <div className={styles.toggleswitchtext}>
                            <p className={styles.toggleswitchheader}>
                                AI Functionality
                            </p>
                            <p className={styles.toggleswitchdescription}>
                                Whether to enable AI empowered analytics for
                                your server
                            </p>
                        </div>
                        <label className={styles.togglecontainer}>
                            <input
                                type="checkbox"
                                className={styles.hidden}
                            ></input>
                            <span className={styles.toggle}>
                                <span className={styles.innertoggle}></span>
                            </span>
                        </label>
                    </div>
                    <div className={styles.toggleswitchcontainer}>
                        <div className={styles.toggleswitchtext}>
                            <p className={styles.toggleswitchheader}>
                                AI Functionality
                            </p>
                            <p className={styles.toggleswitchdescription}>
                                Whether to enable AI empowered analytics for
                                your server
                            </p>
                        </div>
                        <label className={styles.togglecontainer}>
                            <input
                                type="checkbox"
                                className={styles.hidden}
                            ></input>
                            <span className={styles.toggle}>
                                <span className={styles.innertoggle}></span>
                            </span>
                        </label>
                    </div>
                    <div className={styles.toggleswitchcontainer}>
                        <div className={styles.toggleswitchtext}>
                            <p className={styles.toggleswitchheader}>
                                AI Functionality
                            </p>
                            <p className={styles.toggleswitchdescription}>
                                Whether to enable AI empowered analytics for
                                your server
                            </p>
                        </div>
                        <label className={styles.togglecontainer}>
                            <input
                                type="checkbox"
                                className={styles.hidden}
                            ></input>
                            <span className={styles.toggle}>
                                <span className={styles.innertoggle}></span>
                            </span>
                        </label>
                    </div>
                    <div className={styles.toggleswitchcontainer}>
                        <div className={styles.toggleswitchtext}>
                            <p className={styles.toggleswitchheader}>
                                AI Functionality
                            </p>
                            <p className={styles.toggleswitchdescription}>
                                Whether to enable AI empowered analytics for
                                your server
                            </p>
                        </div>
                        <label className={styles.togglecontainer}>
                            <input
                                type="checkbox"
                                className={styles.hidden}
                            ></input>
                            <span className={styles.toggle}>
                                <span className={styles.innertoggle}></span>
                            </span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
