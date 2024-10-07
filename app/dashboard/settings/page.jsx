'use client';
import { useState, useEffect, useRef } from 'react';

/*Top bar*/
import TopBar from '@components/dashboard/top/topbar';
import selectionStyles from '@css/dashboard/selection.module.css';

/*Data Management */
import getGuildData from '@lib/dashboard/getGuildData';
import saveData from '@lib/dashboard/saveData';
import { useGuild } from '@components/context/guildContext';

/*Inputs */
import ArrayInput from '@components/dashboard/inputs/arrayInput';
import Embed from '@/components/dashboard/embeds/embed';
import MultiInput from '@/components/dashboard/inputs/multiInput';

/* Miscellaneous */
import { triggerToast } from '@/components/core/toastNotifications';

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

    const discardChanges = () => {
        triggerToast('Changes Discarded', 'All changes successfully discarded', 'g');
        setNewData({});
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

    if (!selectedGuild) {
        return <div>Loading...</div>;
    }
    const handleInputChange = (id, value, value2) => {
        if (value2) {
            const updatedValues = { ...newData, [id]: `${value}/${value2}` };
            setNewData(updatedValues);
        } else {
            const updatedValues = { ...newData, [id]: value };
            setNewData(updatedValues);
        }
    };

    const tabs = ['generalSettings', 'dashboardAccess', 'Commands'];

    return (
        <div className='dashboard'>
            <TopBar
                type='settings'
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
                <div className={`section ${selectedTab === 'generalSettings' ? 'active' : null}`}>
                    {data ? (
                        <>
                            <Embed />
                        </>
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
                <div className={`section ${selectedTab === 'dashboardAccess' ? 'active' : null}`}>
                    {data ? (
                        <>
                            <div className='inputGroupHalf'>
                                <MultiInput
                                    id='bot-administrator-roles'
                                    possibleOptions={data.data.roles}
                                    values={data.config.permissions.botAdministratorRoles}
                                    icon='icon-at'
                                    onChange={handleInputChange}
                                    width='half'
                                />
                            </div>

                            <div className='inputGroupHalf'>
                                <MultiInput
                                    id='bot-moderator-roles'
                                    possibleOptions={data.data.roles}
                                    values={data.config.permissions.botModeratorRoles}
                                    icon='icon-at'
                                    onChange={handleInputChange}
                                    width='half'
                                />
                            </div>
                            <div className='inputGroupFull'>
                                <ArrayInput
                                    id='guild-administrators'
                                    type='dropdown'
                                    type2='radio'
                                    values={data.data.staff}
                                    onChange={(newValues) => handleInputChange('guild-administrators', newValues)}
                                    possibleOptions={data.data.members}
                                    icon='icon-user'
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
