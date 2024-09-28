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
import ActivityBar from '@components/dashboard/activity/bar';
import DropdownInput from '@/components/dashboard/inputs/dropdown';
import SingleInput from '@/components/dashboard/inputs/singleInput';
import MultiInput from '@/components/dashboard/inputs/multiInput';
import RadioInput from '@/components/dashboard/inputs/radio';

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
                            <div className='inputGroupHalf'>
                                <SingleInput
                                    id='channel-logs-status'
                                    value={data.config.logs.channelLogs.status}
                                    onChange={handleInputChange}
                                    width='half'
                                    type='checkbox'
                                />
                                <DropdownInput
                                    id='channel-logs-channel'
                                    possibleOptions={data.data.channels}
                                    onChange={handleInputChange}
                                    exclude={'2;13;15'}
                                    icon={'icon-hashtag'}
                                    value={data.config.logs.channelLogs.channelID}
                                    width={'half'}
                                />
                            </div>
                            <div className='inputGroupHalf'>
                                <RadioInput
                                    id='channel-logs-filter-mode'
                                    width='half'
                                    value={data.config.logs.channelLogs.filterMode}
                                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                />
                                <MultiInput
                                    id='channel-logs-filter'
                                    width={'half'}
                                    possibleOptions={data.data.channels}
                                    icon='icon-hashtag'
                                    onChange={handleInputChange}
                                    values={data.config.logs.channelLogs.filter}
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
                            <div className='inputGroupHalf'>
                                <SingleInput
                                    id='role-logs-status'
                                    value={data.config.logs.roleLogs.status}
                                    onChange={handleInputChange}
                                    width='half'
                                    type='checkbox'
                                />
                                <DropdownInput
                                    id='role-logs-channel'
                                    possibleOptions={data.data.channels}
                                    onChange={handleInputChange}
                                    exclude={'2;13;15'}
                                    icon={'icon-hashtag'}
                                    value={data.config.logs.roleLogs.channelID}
                                    width={'half'}
                                />
                            </div>
                            <div className='inputGroupHalf'>
                                <RadioInput
                                    id='role-logs-filter-mode'
                                    width='half'
                                    value={data.config.logs.roleLogs.filterMode}
                                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                />
                                <MultiInput
                                    id='role-logs-filter'
                                    width={'half'}
                                    possibleOptions={data.data.roles}
                                    icon='icon-at'
                                    onChange={handleInputChange}
                                    values={data.config.logs.roleLogs.filter}
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
                            <div className='inputGroupHalf'>
                                <SingleInput
                                    id='message-logs-status'
                                    value={data.config.logs.messageLogs.status}
                                    onChange={handleInputChange}
                                    width='half'
                                    type='checkbox'
                                />
                                <DropdownInput
                                    id='message-logs-channel'
                                    possibleOptions={data.data.channels}
                                    onChange={handleInputChange}
                                    exclude={'2;13;15'}
                                    icon={'icon-hashtag'}
                                    value={data.config.logs.messageLogs.channelID}
                                    width={'half'}
                                />
                            </div>
                            <div className='inputGroupHalf'>
                                <RadioInput
                                    id='message-logs-filter-mode'
                                    width='half'
                                    value={data.config.logs.messageLogs.filterMode}
                                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                />
                                <MultiInput
                                    id='message-logs-filter'
                                    width={'half'}
                                    possibleOptions={data.data.channels}
                                    icon='icon-hashtag'
                                    onChange={handleInputChange}
                                    values={data.config.logs.messageLogs.filter}
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
                            <div className='inputGroupHalf'>
                                <SingleInput
                                    id='member-logs-status'
                                    value={data.config.logs.memberLogs.status}
                                    onChange={handleInputChange}
                                    width='half'
                                    type='checkbox'
                                />
                                <DropdownInput
                                    id='member-logs-channel'
                                    possibleOptions={data.data.channels}
                                    onChange={handleInputChange}
                                    exclude={'2;13;15'}
                                    icon={'icon-hashtag'}
                                    value={data.config.logs.memberLogs.channelID}
                                    width={'half'}
                                />
                            </div>
                            <div className='inputGroupHalf'>
                                <RadioInput
                                    id='member-logs-filter-mode'
                                    width='half'
                                    value={data.config.logs.memberLogs.filterMode}
                                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                />
                                <MultiInput
                                    id='member-logs-filter'
                                    width={'half'}
                                    possibleOptions={data.data.members}
                                    icon='icon-user'
                                    onChange={handleInputChange}
                                    values={data.config.logs.memberLogs.filter}
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
                            <div className='inputGroupHalf'>
                                <SingleInput
                                    id='emoji-logs-status'
                                    value={data.config.logs.emojiLogs.status}
                                    onChange={handleInputChange}
                                    width='half'
                                    type='checkbox'
                                />
                                <DropdownInput
                                    id='emoji-logs-channel'
                                    possibleOptions={data.data.channels}
                                    onChange={handleInputChange}
                                    exclude={'2;13;15'}
                                    icon={'icon-hashtag'}
                                    value={data.config.logs.emojiLogs.channelID}
                                    width={'half'}
                                />
                            </div>
                            <div className='inputGroupHalf'>
                                <SingleInput
                                    id='emoji-logs-filter-mode'
                                    width={'half'}
                                    value={data.config.logs.emojiLogs.filterMode}
                                    type='radio'
                                    onChange={handleInputChange}
                                />
                                <MultiInput
                                    id='emoji-logs-filter'
                                    width={'half'}
                                    possibleOptions={data.data.emojiLogs}
                                    icon='icon-face-awesome'
                                    onChange={handleInputChange}
                                    values={data.config.logs.emojiLogs.filter}
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
