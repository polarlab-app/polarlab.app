'use client';
import TopBar from '@components/dashboard/top/topbar';
import { useGuild } from '../guildContext';
import { useState, useEffect, useRef } from 'react';
import selectionStyles from '@css/dashboard/selection.module.css';
import CheckboxInput from '@components/dashboard/inputs/checkbox';
import getGuildData from '@lib/dashboard/getGuildData';
import saveData from '@lib/dashboard/saveData';
import TextboxInput from '@components/dashboard/inputs/textbox';

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

    const tabs = ['channelLogs', 'roleLogs', 'messageLogs', 'memberLogs', 'emojiLogs', 'serverLogs'];

    return (
        <div className='dashboard'>
            <TopBar
                type='logging'
                showButtons={Object.keys(newData).length > 0}
                onDiscard={discardChanges}
                onSave={saveTrigger}
            />
            <div className={selectionStyles.bar}>
                {tabs.map((tabId, index) => (
                    <div
                        key={tabId}
                        id={tabId}
                        ref={(el) => (tabRefs.current[index] = el)}
                        className={`${selectionStyles.item} ${selectedTab === tabId ? selectionStyles.selected : ''}`}
                        onClick={() => handleTabClick(tabId)}
                    >
                        <p>
                            {tabId
                                .split(/(?=[A-Z])/)
                                .join(' ')
                                .replace(/\b\w/g, (char) => char.toUpperCase())}
                        </p>
                    </div>
                ))}
            </div>
            <div className='dashboardWrapper'>
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
                        </>
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
                <div
                    style={{
                        display: selectedTab === 'roleLogs' ? 'block' : 'none',
                    }}
                >
                    {data ? (
                        <>
                            <div className='inputGroupFull'>
                                <CheckboxInput
                                    type='number'
                                    id='role-logs-status'
                                    value={data.config.logs.roleLogs.status}
                                    onChange={(e) => handleCheckboxChange(e.target.id, e.target.value)}
                                />
                            </div>
                            <div className='inputGroupFull'>
                                <TextboxInput
                                    type='number'
                                    id='role-logs-channel'
                                    value={data.config.logs.roleLogs.channelId}
                                    onChange={(e) => handleTextboxChange(e.target.id, e.target.value)}
                                />
                            </div>
                        </>
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
                <div
                    style={{
                        display: selectedTab === 'messageLogs' ? 'block' : 'none',
                    }}
                >
                    {data ? (
                        <>
                            <div className='inputGroupFull'>
                                <CheckboxInput
                                    type='number'
                                    id='message-logs-status'
                                    value={data.config.logs.messageLogs.status}
                                    onChange={(e) => handleCheckboxChange(e.target.id, e.target.value)}
                                />
                            </div>
                            <div className='inputGroupFull'>
                                <TextboxInput
                                    type='number'
                                    id='message-logs-channel'
                                    value={data.config.logs.messageLogs.channelId}
                                    onChange={(e) => handleTextboxChange(e.target.id, e.target.value)}
                                />
                            </div>
                        </>
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
                <div
                    style={{
                        display: selectedTab === 'memberLogs' ? 'block' : 'none',
                    }}
                >
                    {data ? (
                        <>
                            <div className='inputGroupFull'>
                                <CheckboxInput
                                    type='number'
                                    id='member-logs-status'
                                    value={data.config.logs.memberLogs.status}
                                    onChange={(e) => handleCheckboxChange(e.target.id, e.target.value)}
                                />
                            </div>
                            <div className='inputGroupFull'>
                                <TextboxInput
                                    type='number'
                                    id='member-logs-channel'
                                    value={data.config.logs.memberLogs.channelId}
                                    onChange={(e) => handleTextboxChange(e.target.id, e.target.value)}
                                />
                            </div>
                        </>
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
                <div
                    style={{
                        display: selectedTab === 'emojiLogs' ? 'block' : 'none',
                    }}
                >
                    {data ? (
                        <>
                            <div className='inputGroupFull'>
                                <CheckboxInput
                                    type='number'
                                    id='emoji-logs-status'
                                    value={data.config.logs.emojiLogs.status}
                                    onChange={(e) => handleCheckboxChange(e.target.id, e.target.value)}
                                />
                            </div>
                            <div className='inputGroupFull'>
                                <TextboxInput
                                    type='number'
                                    id='emoji-logs-channel'
                                    value={data.config.logs.emojiLogs.channelId}
                                    onChange={(e) => handleTextboxChange(e.target.id, e.target.value)}
                                />
                            </div>
                        </>
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
                <div
                    style={{
                        display: selectedTab === 'serverLogs' ? 'block' : 'none',
                    }}
                >
                    {data ? (
                        <>
                            <div className='inputGroupFull'>
                                <CheckboxInput
                                    type='number'
                                    id='server-logs-status'
                                    value={data.config.logs.serverLogs.status}
                                    onChange={(e) => handleCheckboxChange(e.target.id, e.target.value)}
                                />
                            </div>
                            <div className='inputGroupFull'>
                                <TextboxInput
                                    type='number'
                                    id='server-logs-channel'
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
