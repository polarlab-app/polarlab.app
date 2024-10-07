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
import RadioInput from '@components/dashboard/inputs/radio';
import RangeInput from '@components/dashboard/inputs/range';
import DoubleInput from '@components/dashboard/inputs/doubleInput';
import ArrayInput from '@components/dashboard/inputs/arrayInput';
import MultiInput from '@components/dashboard/inputs/multiInput';

/* Miscellaneous */
import { triggerToast } from '@/components/core/toastNotifications';
import DropdownInput from '@/components/dashboard/inputs/dropdown';
import SingleInput from '@/components/dashboard/inputs/singleInput';

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

    const tabs = ['levelingSettings', 'levelingRewards', 'expBoosters', 'levelingDisplay'];

    return (
        <div className='dashboard'>
            <TopBar
                type='exp-and-leveling'
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
                        <p className={selectionStyles.tabText}>
                            {tabId
                                .split(/(?=[A-Z])/)
                                .join(' ')
                                .replace(/\b\w/g, (char) => char.toUpperCase())}
                        </p>
                    </div>
                ))}
            </div>
            <div className='dashboardWrapper'>
                <div className={`section ${selectedTab === 'levelingSettings' ? 'active' : null}`}>
                    {data ? (
                        <>
                            <div className='inputGroupFull'>
                                <CheckboxInput
                                    type='number'
                                    id='leveling-status'
                                    value={data.config.leveling.status}
                                    onChange={(e) => handleInputChange(e.target.id, e.target.checked)}
                                />
                            </div>
                            <div className='inputGroupHalf'>
                                <RadioInput
                                    id='leveling-exp-type'
                                    value={data.config.leveling.type}
                                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                />
                                {(newData && newData['leveling-exp-type'] === 'range') ||
                                (!newData['leveling-exp-type'] && data && data.config.leveling.type === 'range') ? (
                                    <DoubleInput
                                        id='leveling-exp-amount'
                                        type='text'
                                        value={data.config.leveling.amount.split('/')[0]}
                                        value2={data.config.leveling.amount.split('/')[1]}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <RangeInput
                                        id='leveling-exp-amount'
                                        value={data.config.leveling.amount}
                                        onChange={(e) => handleInputChange(e.target.id, e.target.value)}
                                    />
                                )}
                            </div>
                            <div className='inputGroupHalf'>
                                <MultiInput
                                    id='leveling-filter'
                                    possibleOptions={data.data.channels}
                                    values={data.config.leveling.filter}
                                    width='half'
                                    icon='icon-hashtag'
                                    onChange={handleInputChange}
                                />
                            </div>
                        </>
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
                <div className={`section ${selectedTab === 'levelingRewards' ? 'active' : null}`}>
                    {data ? (
                        <>
                            <div className='inputGroupFull'>
                                <CheckboxInput
                                    id='leveling-reward-status'
                                    value={data.config.leveling.rewards.status}
                                    onChange={(e) => handleInputChange(e.target.id, e.target.checked)}
                                />
                                <ArrayInput
                                    id='leveling-rewards'
                                    type='text'
                                    type2='dropdown'
                                    values={data.config.leveling.rewards.rewards}
                                    possibleOptions={data.data.roles}
                                    onChange={(newValues) => handleInputChange('leveling-rewards', newValues)}
                                    icon='icon-at'
                                />
                            </div>
                        </>
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
                <div className={`section ${selectedTab === 'expBoosters' ? 'active' : null}`}>
                    {data ? (
                        <>
                            <div className='inputGroupFull'>
                                <CheckboxInput
                                    id='leveling-boosters-status'
                                    value={data.config.leveling.boosters.status}
                                    onChange={(e) => handleInputChange(e.target.id, e.target.checked)}
                                />
                                <SingleInput
                                    id='leveling-booster-mode'
                                    value={data.config.leveling.boosters.mode}
                                    type='radio'
                                    onChange={handleInputChange}
                                    width='full'
                                />
                            </div>
                            <div className='inputGroupFull'>
                                <ArrayInput
                                    id='leveling-role-boosters'
                                    type='dropdown'
                                    type2='range'
                                    values={data.config.leveling.boosters.roleBoosters}
                                    possibleOptions={data.data.roles}
                                    icon={'icon-at'}
                                    onChange={(newValues) => handleInputChange('leveling-role-boosters', newValues)}
                                />
                            </div>
                            <div className='inputGroupFull'>
                                <ArrayInput
                                    id='leveling-channel-boosters'
                                    type='dropdown'
                                    type2='range'
                                    values={data.config.leveling.boosters.channelBoosters}
                                    possibleOptions={data.data.channels}
                                    icon={'icon-hashtag'}
                                    onChange={(newValues) => handleInputChange('leveling-channel-boosters', newValues)}
                                />
                            </div>
                            <div className='inputGroupFull'>
                                <ArrayInput
                                    id='leveling-member-boosters'
                                    type='dropdown'
                                    type2='range'
                                    values={data.config.leveling.boosters.memberBoosters}
                                    possibleOptions={data.data.members}
                                    icon={'icon-user'}
                                    onChange={(newValues) => handleInputChange('leveling-member-boosters', newValues)}
                                />
                            </div>
                        </>
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
                <div className={`section ${selectedTab === 'levelingDisplay' ? 'active' : null}`}>
                    {data ? (
                        <>
                            <div className='inputGroupFull'>
                                <CheckboxInput
                                    id='leveling-display-status'
                                    value={data.config.leveling.display.status}
                                    onChange={(e) => handleInputChange(e.target.id, e.target.checked)}
                                />
                            </div>
                            <div className='inputGroupHalf'>
                                <RadioInput
                                    id='leveling-display-type'
                                    value={data.config.leveling.display.type}
                                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                />
                                {(newData && newData['leveling-display-type'] == 'dedicated') ||
                                (!newData['leveling-display-type'] &&
                                    data &&
                                    data.config.leveling.display.type === 'dedicated') ? (
                                    <DropdownInput
                                        id='leveling-display-channel'
                                        value={data.config.leveling.display.channelID}
                                        onChange={handleInputChange}
                                        width={'half'}
                                        possibleOptions={data.data.channels}
                                        icon='icon-hashtag'
                                        exclude={'2'}
                                    />
                                ) : null}
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
