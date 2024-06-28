'use client';
import TopBar from '@/components/dashboard/topbar';
import { useGuild } from '../guildContext';
import styles from '@css/dashboard/settings.module.css';
import DiscardButton from '@/components/dashboard/discardButton';
import SaveButton from '@/components/dashboard/saveButton';
import { useState, useEffect, useRef } from 'react';
import selectionStyles from '@css/dashboard/selection.module.css';
import CheckboxInput from '@/components/dashboard/inputs/checkbox';
import getGuildData from '@/lib/dashboard/getGuildData';
import saveData from '@/lib/dashboard/saveData';
import TextboxInput from '@/components/dashboard/inputs/textbox';

export default function Page() {
    const { selectedGuild, setSelectedGuild } = useGuild();
    const [newData, setNewData] = useState({});
    const [selectedTab, setSelectedTab] = useState('');
    const [data, setData] = useState(null);
    const tabRefs = useRef([]);

    useEffect(() => {
        if (!selectedGuild) return;

        const fetchData = async () => {
            const guildData = JSON.parse(await getGuildData(selectedGuild.id));
            setData(guildData);
        };

        fetchData();

        if (tabRefs.current.length > 0) {
            setSelectedTab(tabRefs.current[0].id);
        }
    }, [selectedGuild, tabRefs.current.length]);

    const handleCheckboxChange = (id, value) => {
        const updatedCheckboxValues = { ...newData };
        updatedCheckboxValues[id] = value;
        setNewData(updatedCheckboxValues);
        console.log(newData);
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

    const handleTabClick = (tabId) => {
        setSelectedTab(tabId);
    };

    const handleTextboxChange = (id, value) => {
        const updatedTextboxValues = { ...newData };
        updatedTextboxValues[id] = value;
        setNewData(updatedTextboxValues);
    };

    if (!selectedGuild) {
        return <div>Loading...</div>;
    }

    return (
        <div className='dashboard'>
            <TopBar type='logging'>
                {' '}
                {Object.keys(newData).length > 0 && (
                    <>
                        <DiscardButton onClick={() => discardChanges()} />
                        <SaveButton onClick={() => saveTrigger()} />
                    </>
                )}
            </TopBar>
            <div className={selectionStyles.bar}>
                <div
                    id='channelLogs'
                    ref={(el) => (tabRefs.current[0] = el)}
                    className={`${selectionStyles.item} ${
                        selectedTab === 'channelLogs' ? selectionStyles.selected : ''
                    }`}
                    onClick={() => handleTabClick('channelLogs')}>
                    <p>Channel Logs</p>
                </div>
                <div
                    id='roleLogs'
                    ref={(el) => (tabRefs.current[1] = el)}
                    className={`${selectionStyles.item} ${selectedTab === 'roleLogs' ? selectionStyles.selected : ''}`}
                    onClick={() => handleTabClick('roleLogs')}>
                    <p>Role Logs</p>
                </div>
                <div
                    id='messageLogs'
                    ref={(el) => (tabRefs.current[2] = el)}
                    className={`${selectionStyles.item} ${
                        selectedTab === 'messageLogs' ? selectionStyles.selected : ''
                    }`}
                    onClick={() => handleTabClick('messageLogs')}>
                    <p>Message Logs</p>
                </div>
                <div
                    id='memberLogs'
                    ref={(el) => (tabRefs.current[3] = el)}
                    className={`${selectionStyles.item} ${
                        selectedTab === 'memberLogs' ? selectionStyles.selected : ''
                    }`}
                    onClick={() => handleTabClick('memberLogs')}>
                    <p>Member Logs</p>
                </div>
                <div
                    id='emojiLogs'
                    ref={(el) => (tabRefs.current[4] = el)}
                    className={`${selectionStyles.item} ${selectedTab === 'emojiLogs' ? selectionStyles.selected : ''}`}
                    onClick={() => handleTabClick('emojiLogs')}>
                    <p>Emoji Logs</p>
                </div>
                <div
                    id='serverLogs'
                    ref={(el) => (tabRefs.current[5] = el)}
                    className={`${selectionStyles.item} ${
                        selectedTab === 'serverLogs' ? selectionStyles.selected : ''
                    }`}
                    onClick={() => handleTabClick('serverLogs')}>
                    <p>Server Logs</p>
                </div>
            </div>
            <div className='dashboardwrapper'>
                <div style={{ display: selectedTab === 'channelLogs' ? 'block' : 'none' }}>
                    {data ? (
                        <>
                            <div className={styles.togglegroup}>
                                <CheckboxInput
                                    type='channel-logs-status'
                                    value={data.config.logs.channelLogs.status}
                                    onChange={(e) => handleCheckboxChange(e.target.id, e.target.checked)}
                                />
                            </div>
                            <div className={styles.togglegroup}>
                                <TextboxInput
                                    type='channel-logs-channel'
                                    value={data.config.logs.channelLogs.channelId}
                                    onChange={(e) => handleTextboxChange(e.target.id, e.target.value)}
                                />
                            </div>
                        </>
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
                <div style={{ display: selectedTab === 'roleLogs' ? 'block' : 'none' }}>
                    {data ? (
                        <>
                            <div className={styles.togglegroup}>
                                <CheckboxInput
                                    type='role-logs-status'
                                    value={data.config.logs.roleLogs.status}
                                    onChange={(e) => handleCheckboxChange(e.target.id, e.target.value)}
                                />
                            </div>
                            <div className={styles.togglegroup}>
                                <TextboxInput
                                    type='role-logs-channel'
                                    value={data.config.logs.roleLogs.channelId}
                                    onChange={(e) => handleTextboxChange(e.target.id, e.target.value)}
                                />
                            </div>
                        </>
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
                <div style={{ display: selectedTab === 'messageLogs' ? 'block' : 'none' }}>
                    {data ? (
                        <>
                            <div className={styles.togglegroup}>
                                <CheckboxInput
                                    type='message-logs-status'
                                    value={data.config.logs.messageLogs.status}
                                    onChange={(e) => handleCheckboxChange(e.target.id, e.target.value)}
                                />
                            </div>
                            <div className={styles.togglegroup}>
                                <TextboxInput
                                    type='message-logs-channel'
                                    value={data.config.logs.messageLogs.channelId}
                                    onChange={(e) => handleTextboxChange(e.target.id, e.target.value)}
                                />
                            </div>
                        </>
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
                <div style={{ display: selectedTab === 'memberLogs' ? 'block' : 'none' }}>
                    {data ? (
                        <>
                            <div className={styles.togglegroup}>
                                <CheckboxInput
                                    type='member-logs-status'
                                    value={data.config.logs.memberLogs.status}
                                    onChange={(e) => handleCheckboxChange(e.target.id, e.target.value)}
                                />
                            </div>
                            <div className={styles.togglegroup}>
                                <TextboxInput
                                    type='member-logs-channel'
                                    value={data.config.logs.memberLogs.channelId}
                                    onChange={(e) => handleTextboxChange(e.target.id, e.target.value)}
                                />
                            </div>
                        </>
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
                <div style={{ display: selectedTab === 'emojiLogs' ? 'block' : 'none' }}>
                    {data ? (
                        <>
                            <div className={styles.togglegroup}>
                                <CheckboxInput
                                    type='emoji-logs-status'
                                    value={data.config.logs.emojiLogs.status}
                                    onChange={(e) => handleCheckboxChange(e.target.id, e.target.value)}
                                />
                            </div>
                            <div className={styles.togglegroup}>
                                <TextboxInput
                                    type='emoji-logs-channel'
                                    value={data.config.logs.emojiLogs.channelId}
                                    onChange={(e) => handleTextboxChange(e.target.id, e.target.value)}
                                />
                            </div>
                        </>
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
                <div style={{ display: selectedTab === 'serverLogs' ? 'block' : 'none' }}>
                    {data ? (
                        <>
                            <div className={styles.togglegroup}>
                                <CheckboxInput
                                    type='server-logs-status'
                                    value={data.config.logs.serverLogs.status}
                                    onChange={(e) => handleCheckboxChange(e.target.id, e.target.value)}
                                />
                            </div>
                            <div className={styles.togglegroup}>
                                <TextboxInput
                                    type='server-logs-channel'
                                    value={data.config.logs.serverLogs.channelId}
                                    onChange={(e) => handleTextboxChange(e.target.id, e.target.value)}
                                />
                            </div>
                        </>
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
            </div>
        </div>
    );
}
