'use client';

import { useState, useEffect, useRef } from 'react';

/* Top bar */
import TopBar from '@components/dashboard/top/topbar';
import selectionStyles from '@css/dashboard/selection.module.css';

/* Data Management */
import { useGuild } from '../guildContext';
import getGuildData from '@lib/dashboard/getGuildData';
import saveData from '@lib/dashboard/saveData';

/* Inputs */
import CheckboxInput from '@components/dashboard/inputs/checkbox';
import TextboxInput from '@components/dashboard/inputs/textbox';
import RadioInput from '@/components/dashboard/inputs/radio';

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

    const handleRadioChange = (id, value) => {
        const updatedRadioValues = { ...newData };
        updatedRadioValues[id] = value;
        setNewData(updatedRadioValues);
        console.log(newData);
    };

    if (!selectedGuild) {
        return <div>Loading...</div>;
    }

    return (
        <div className='dashboard'>
            <TopBar
                type='exp-and-leveling'
                showButtons={Object.keys(newData).length > 0}
                onDiscard={discardChanges}
                onSave={saveTrigger}
            />
            <div className={selectionStyles.bar}>
                <div
                    id='channelLogs'
                    ref={(el) => (tabRefs.current[0] = el)}
                    className={`${selectionStyles.item} ${
                        selectedTab === 'channelLogs' ? selectionStyles.selected : ''
                    }`}
                    onClick={() => handleTabClick('channelLogs')}
                >
                    <p>Channel Logs</p>
                </div>
                <div
                    id='roleLogs'
                    ref={(el) => (tabRefs.current[1] = el)}
                    className={`${selectionStyles.item} ${selectedTab === 'roleLogs' ? selectionStyles.selected : ''}`}
                    onClick={() => handleTabClick('roleLogs')}
                >
                    <p>Role Logs</p>
                </div>
                <div
                    id='messageLogs'
                    ref={(el) => (tabRefs.current[2] = el)}
                    className={`${selectionStyles.item} ${
                        selectedTab === 'messageLogs' ? selectionStyles.selected : ''
                    }`}
                    onClick={() => handleTabClick('messageLogs')}
                >
                    <p>Message Logs</p>
                </div>
                <div
                    id='memberLogs'
                    ref={(el) => (tabRefs.current[3] = el)}
                    className={`${selectionStyles.item} ${
                        selectedTab === 'memberLogs' ? selectionStyles.selected : ''
                    }`}
                    onClick={() => handleTabClick('memberLogs')}
                >
                    <p>Member Logs</p>
                </div>
                <div
                    id='emojiLogs'
                    ref={(el) => (tabRefs.current[4] = el)}
                    className={`${selectionStyles.item} ${selectedTab === 'emojiLogs' ? selectionStyles.selected : ''}`}
                    onClick={() => handleTabClick('emojiLogs')}
                >
                    <p>Emoji Logs</p>
                </div>
                <div
                    id='serverLogs'
                    ref={(el) => (tabRefs.current[5] = el)}
                    className={`${selectionStyles.item} ${
                        selectedTab === 'serverLogs' ? selectionStyles.selected : ''
                    }`}
                    onClick={() => handleTabClick('serverLogs')}
                >
                    <p>Server Logs</p>
                </div>
            </div>
            <div className='dashboardwrapper'>
                <div
                    style={{
                        display: selectedTab === 'channelLogs' ? 'block' : 'none',
                    }}
                >
                    {data ? (
                        <>
                            <div className='inputGroupFull'>
                                <CheckboxInput
                                    type='number'
                                    id='channel-logs-status'
                                    value={data.config.logs.channelLogs.status}
                                    onChange={(e) => handleCheckboxChange(e.target.id, e.target.checked)}
                                />
                            </div>
                            <div className='inputGroupFull'>
                                <TextboxInput
                                    type='number'
                                    id='channel-logs-channel'
                                    value={data.config.logs.channelLogs.channelId}
                                    onChange={(e) => handleTextboxChange(e.target.id, e.target.value)}
                                />
                            </div>
                            <div className='inputGroupHalf'>
                                <RadioInput
                                    id='leveling-exp-amount'
                                    value='static'
                                    onChange={(e) => handleRadioChange(e.target.id, e.target.value)}
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