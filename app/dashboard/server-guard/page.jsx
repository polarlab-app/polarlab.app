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
import RadioInput from '@components/dashboard/inputs/radio';
import RangeInput from '@components/dashboard/inputs/range';
import DoubleInput from '@components/dashboard/inputs/doubleInput';
import ArrayInput from '@/components/dashboard/inputs/arrayInput';

/* Miscellaneous */
import { triggerToast } from '@/components/core/toastNotifications';
import MultiInput from '@/components/dashboard/inputs/multiInput';
import DropdownInput from '@/components/dashboard/inputs/dropdown';

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

    const tabs = ['verification'];

    return (
        <div className='dashboard'>
            <TopBar
                type='server-guard'
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
                <div className={`section ${selectedTab === 'verification' ? 'active' : null}`}>
                    {data ? (
                        <>
                            <div className='inputGroupFull'>
                                <CheckboxInput
                                    type='number'
                                    id='verification-status'
                                    value={data.config.verification.status}
                                    onChange={(e) => handleInputChange(e.target.id, e.target.checked)}
                                />
                            </div>
                            <div className='inputGroupHalf'>
                                <DropdownInput
                                    id='verification-channel'
                                    width='half'
                                    value={data.config.verification}
                                    onChange={handleInputChange}
                                    possibleOptions={data.data.channels}
                                    icon='icon-hashtag'
                                    exclude=''
                                />
                            </div>
                            <div className='inputGroupHalf'>
                                <MultiInput
                                    id='verification-roles'
                                    possibleOptions={data.data.roles}
                                    values={data.config.verification.roles}
                                    width='half'
                                    onChange={handleInputChange}
                                    icon='icon-at'
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