'use client';

import { useState, useEffect, useRef } from 'react';

/* Top bar */
import TopBar from '@components/dashboard/top/topbar';
import selectionStyles from '@css/dashboard/selection.module.css';

/* Data Management */
import { useGuild } from '@components/context/guildContext';
import getGuildData from '@lib/dashboard/getGuildData';
import saveData from '@lib/dashboard/saveData';

/* Inputs */
import CheckboxInput from '@components/dashboard/inputs/checkbox';
import TextboxInput from '@components/dashboard/inputs/textbox';
import ActivityBar from '@components/dashboard/activity/bar';
import DropdownInput from '@/components/dashboard/inputs/dropdown';
import SingleInput from '@/components/dashboard/inputs/singleInput';
import MultiInput from '@/components/dashboard/inputs/multiInput';

/* Miscellaneous */
import { triggerToast } from '@/components/core/toastNotifications';

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
            if (guildData.h) {
                triggerToast(guildData.h, guildData.d, guildData.c);
                return;
            }
            setData(guildData);
        };

        fetchData();

        if (tabRefs.current.length > 0) {
            setSelectedTab(tabRefs.current[0].id);
        }
    }, [selectedGuild, tabRefs.current.length]);

    const discardChanges = async () => {
        triggerToast('Changes Discarded', 'All changes successfully discarded', 'g');
        setNewData({});
        await fetchData();
    };

    const saveTrigger = async () => {
        const response = JSON.parse(await saveData(newData, selectedGuild.id));
        triggerToast(response.h, response.d, response.c);
        if (response.s) {
            setNewData({});
            await fetchData();
        }
    };

    const fetchData = async () => {
        const data = JSON.parse(await getGuildData(selectedGuild.id));
        setData(data);
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
                                <DropdownInput
                                    id='channel-logs-channel'
                                    possibleOptions={data.data.channels}
                                    onChange={handleInputChange}
                                    exclude={'2;13;15'}
                                    icon={'icon-hashtag'}
                                    value={data.config.logs.channelLogs.channelID}
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
                                    onChange={(e) => handleInputChange(e.target.id, e.target.checked)}
                                />
                                <DropdownInput
                                    id='role-logs-channel'
                                    possibleOptions={data.data.channels}
                                    onChange={handleInputChange}
                                    exclude={'2;13;15'}
                                    icon={'icon-hashtag'}
                                    value={data.config.logs.roleLogs.channelID}
                                />
                            </div>
                            <div className='inputGroupFull'></div>
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
                                <DropdownInput
                                    id='message-logs-channel'
                                    possibleOptions={data.data.channels}
                                    onChange={handleInputChange}
                                    exclude={'2;13;15'}
                                    icon={'icon-hashtag'}
                                    value={data.config.logs.messageLogs.channelID}
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
                                <DropdownInput
                                    id='member-logs-channel'
                                    possibleOptions={data.data.channels}
                                    onChange={handleInputChange}
                                    exclude={'2;13;15'}
                                    icon={'icon-hashtag'}
                                    value={data.config.logs.memberLogs.channelID}
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
                                <DropdownInput
                                    id='emoji-logs-channel'
                                    possibleOptions={data.data.channels}
                                    onChange={handleInputChange}
                                    exclude={'2;13;15'}
                                    icon={'icon-hashtag'}
                                    value={data.config.logs.emojiLogs.channelID}
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
                                <DropdownInput
                                    id='server-logs-channel'
                                    possibleOptions={data.data.channels}
                                    onChange={handleInputChange}
                                    exclude={'2;13;15'}
                                    icon={'icon-hashtag'}
                                    value={data.config.logs.serverLogs.channelID}
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
                {selectedTab == 'caseHistory' ? null : <ActivityBar type={selectedTab} id={selectedGuild.id} />}
            </div>
        </div>
    );
}
