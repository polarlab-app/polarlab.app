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

    const handleInputChange = (id, value) => {
        const updatedValues = { ...newData, [id]: value };
        setNewData(updatedValues);
    };

    const handleDoubleInputChange = (id, value, value2) => {
        const updatedValues = { ...newData, [id]: `${value}/${value2}` };
        setNewData(updatedValues);
    };

    if (!selectedGuild) {
        return <div>Loading...</div>;
    }

    const tabs = ['levelingSettings', 'levelingRewards', 'expBoosters'];

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
                <div
                    style={{
                        display: selectedTab === 'levelingSettings' ? 'block' : 'none',
                    }}
                >
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
                            <div className='inputGroupFull'>
                                <TextboxInput
                                    type='number'
                                    id='leveling-channel'
                                    value={data.config.leveling.channelID}
                                    onChange={(e) => handleInputChange(e.target.id, e.target.value)}
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
                                        onChange={handleDoubleInputChange}
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
            </div>
        </div>
    );
}