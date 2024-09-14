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
import ActivityBar from '@components/dashboard/activity/bar';

export default function Page() {
    const { selectedGuild } = useGuild();
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

    const discardChanges = () => {
        setNewData({});
    };

    const saveTrigger = async () => {
        const response = await saveData(newData, selectedGuild.id);
        if (response) {
            setNewData({});
        } else {
            alert('fail');
        }
    };

    const handleTabClick = (tabId) => {
        setSelectedTab(tabId);
    };

    const handleInputChange = (id, value, value2) => {
        if (value2) {
            const updatedValues = { ...newData, [id]: `${value}/${value2}` };
            setNewData(updatedValues);
        } else {
            const updatedValues = { ...newData, [id]: value };
            setNewData(updatedValues);
        }
    };

    if (!selectedGuild) {
        return <div>Loading...</div>;
    }

    const tabs = ['channelLogs', 'roleLogs', 'memberLogs', 'serverLogs', 'emojiLogs', 'messageLogs', 'caseHistory'];

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
                <div className={`section ${selectedTab === 'channelLogs' ? 'active' : null}`}>
                    {data ? (
                        <>
                            <div className='inputGroupFull'>
                                <CheckboxInput
                                    type='number'
                                    id='channel-logs-status'
                                    value={data.config.logs.channelLogs.status}
                                    onChange={(e) => handleInputChange(e.target.id, e.target.checked)}
                                />
                            </div>
                            <div className='inputGroupFull'>
                                <TextboxInput
                                    type='number'
                                    id='channel-logs-channel'
                                    value={data.config.logs.channelLogs.channelID}
                                    onChange={(e) => handleInputChange(e.target.id, e.target.value)}
                                />
                            </div>
                        </>
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
                <div className={`section ${selectedTab === 'roleLogs' ? 'active' : null}`}>
                    {data ? (
                        <>
                            <div className='inputGroupFull'>
                                <CheckboxInput
                                    type='number'
                                    id='role-logs-status'
                                    value={data.config.logs.roleLogs.status}
                                    onChange={(e) => handleInputChange(e.target.id, e.target.value)}
                                />
                            </div>
                            <div className='inputGroupFull'>
                                <TextboxInput
                                    type='number'
                                    id='role-logs-channel'
                                    value={data.config.logs.roleLogs.channelID}
                                    onChange={(e) => handleInputChange(e.target.id, e.target.value)}
                                />
                            </div>
                        </>
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
                <div className={`section ${selectedTab === 'messageLogs' ? 'active' : null}`}>
                    {data ? (
                        <>
                            <div className='inputGroupFull'>
                                <CheckboxInput
                                    type='number'
                                    id='message-logs-status'
                                    value={data.config.logs.messageLogs.status}
                                    onChange={(e) => handleInputChange(e.target.id, e.target.value)}
                                />
                            </div>
                            <div className='inputGroupFull'>
                                <TextboxInput
                                    type='number'
                                    id='message-logs-channel'
                                    value={data.config.logs.messageLogs.channelID}
                                    onChange={(e) => handleInputChange(e.target.id, e.target.value)}
                                />
                            </div>
                        </>
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
                <div className={`section ${selectedTab === 'memberLogs' ? 'active' : null}`}>
                    {data ? (
                        <>
                            <div className='inputGroupFull'>
                                <CheckboxInput
                                    type='number'
                                    id='member-logs-status'
                                    value={data.config.logs.memberLogs.status}
                                    onChange={(e) => handleInputChange(e.target.id, e.target.value)}
                                />
                            </div>
                            <div className='inputGroupFull'>
                                <TextboxInput
                                    type='number'
                                    id='member-logs-channel'
                                    value={data.config.logs.memberLogs.channelD}
                                    onChange={(e) => handleInputChange(e.target.id, e.target.value)}
                                />
                            </div>
                        </>
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
                <div className={`section ${selectedTab === 'emojiLogs' ? 'active' : null}`}>
                    {data ? (
                        <>
                            <div className='inputGroupFull'>
                                <CheckboxInput
                                    type='number'
                                    id='emoji-logs-status'
                                    value={data.config.logs.emojiLogs.status}
                                    onChange={(e) => handleInputChange(e.target.id, e.target.value)}
                                />
                            </div>
                            <div className='inputGroupFull'>
                                <TextboxInput
                                    type='number'
                                    id='emoji-logs-channel'
                                    value={data.config.logs.emojiLogs.channelID}
                                    onChange={(e) => handleInputChange(e.target.id, e.target.value)}
                                />
                            </div>
                        </>
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
                <div className={`section ${selectedTab === 'serverLogs' ? 'active' : null}`}>
                    {data ? (
                        <>
                            <div className='inputGroupFull'>
                                <CheckboxInput
                                    type='number'
                                    id='server-logs-status'
                                    value={data.config.logs.serverLogs.status}
                                    onChange={(e) => handleInputChange(e.target.id, e.target.value)}
                                />
                            </div>
                            <div className='inputGroupFull'>
                                <TextboxInput
                                    type='number'
                                    id='server-logs-channel'
                                    value={data.config.logs.serverLogs.channelID}
                                    onChange={(e) => handleInputChange(e.target.id, e.target.value)}
                                />
                            </div>
                        </>
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
                <div className={`section ${selectedTab === 'caseHistory' ? 'active' : null}`}>
                    <div className='inputGroupFull'></div>
                </div>
                {selectedTab == 'caseHistory' ? null : <ActivityBar type={selectedTab} />}
            </div>
        </div>
    );
}
