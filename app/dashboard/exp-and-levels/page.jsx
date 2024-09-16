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
import RadioInput from '@components/dashboard/inputs/radio';
import RangeInput from '@components/dashboard/inputs/range';
import DoubleInput from '@components/dashboard/inputs/doubleInput';
import ArrayInput from '@components/dashboard/inputs/arrayInput';

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

    const fetchData = async () => {
        const data = JSON.parse(await getGuildData(selectedGuild.id));
        setData(data);
    };

    const saveTrigger = async () => {
        const response = await saveData(newData, selectedGuild.id || '');
        await fetchData();
        if (!response) {
            alert('fail');
        } else {
            setNewData({});
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
                                    type='t'
                                    type2='t'
                                    values={data.config.leveling.rewards.rewards}
                                    onChange={(newValues) => handleInputChange('leveling-rewards', newValues)}
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
                            </div>
                            <div className='inputGroupFull'>
                                <ArrayInput
                                    id='leveling-role-boosters'
                                    type='t'
                                    type2='r'
                                    values={data.config.leveling.boosters.roleBoosters}
                                    onChange={(newValues) => handleInputChange('leveling-role-boosters', newValues)}
                                />
                            </div>
                            <div className='inputGroupFull'>
                                <ArrayInput
                                    id='leveling-channel-boosters'
                                    type='t'
                                    type2='r'
                                    values={data.config.leveling.boosters.channelBoosters}
                                    onChange={(newValues) => handleInputChange('leveling-channel-boosters', newValues)}
                                />
                            </div>
                            <div className='inputGroupFull'>
                                <ArrayInput
                                    id='leveling-member-boosters'
                                    type='t'
                                    type2='r'
                                    values={data.config.leveling.boosters.memberBoosters}
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
                                    <TextboxInput
                                        id='leveling-display-channel'
                                        value={data.config.leveling.display.channelID}
                                        onChange={(e) => handleInputChange(e.target.id, e.target.value)}
                                        width={'half'}
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
