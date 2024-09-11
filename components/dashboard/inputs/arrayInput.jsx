'use client';
import styles from '@css/dashboard/arrayInput.module.css';
const { inputs } = require('@data/dashboard.json');
import { useState, useEffect } from 'react';

export default function ArrayInput({ id, values, type, type2, onChange }) {
    const optionsCount = Math.floor((inputs[id].max - inputs[id].min) / inputs[id].step) + 1;
    const [data, setData] = useState(values || []);

    useEffect(() => {
        if (data != values) {
            onChange(data);
        }
    }, [data]);

    const handleInputChange = (index, field, value) => {
        const newData = [...data];
        newData[index][field] = value;
        setData(newData);
    };

    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <div className={styles.headerContainer}>
                    <p className={styles.header}>{inputs[id].name}</p>
                    <p className={styles.description}>{inputs[id].description}</p>
                </div>
                <div className={styles.buttonContainer}>
                    <button
                        className={styles.button}
                        onClick={() =>
                            data.length < inputs[id].limit && setData([...data, { id: '', value: inputs[id].min }])
                        }
                        disabled={data.length == inputs[id].limit}
                    >
                        Add Booster
                    </button>
                    <div className={styles.limitContainer}>
                        <p className={styles.current}>{data.length}</p>
                        <hr className={styles.limitDivider} />
                        <p className={styles.limit}>{inputs[id].limit}</p>
                    </div>
                </div>
            </div>

            <div className={styles.inputContainer}>
                {data.map((value, index) => (
                    <div className={styles.input} key={index}>
                        <div className={styles.first}>
                            {type === 't' ? (
                                <div className={styles.textInputContainer}>
                                    <input
                                        className={styles.textInput}
                                        type='text'
                                        value={value.id}
                                        placeholder={inputs[id].placeholder}
                                        onChange={(e) => handleInputChange(index, 'id', e.target.value)}
                                    />
                                </div>
                            ) : (
                                <div className={styles.rangeInputContainer}>
                                    <div className={styles.values}>
                                        {Array.from({ length: optionsCount }, (_, idx) => {
                                            const currentValue = inputs[id].min + idx * inputs[id].step;
                                            const isActive = currentValue == Number(data[index].value);
                                            return (
                                                <div
                                                    className={`${styles.value} ${isActive ? styles.active : ''}`}
                                                    key={idx}
                                                >
                                                    {`${Number(currentValue)}x`}
                                                    <hr className={styles.line} />
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <input
                                        className={styles.rangeInput}
                                        type='range'
                                        value={Number(value.value)}
                                        min={inputs[id].min}
                                        max={inputs[id].max}
                                        step={inputs[id].step}
                                        onChange={(e) => handleInputChange(index, 'value', e.target.value)}
                                    />
                                </div>
                            )}
                        </div>
                        <div className={styles.second}>
                            {type2 === 't' ? (
                                <div className={styles.textInputContainer}>
                                    <input
                                        className={styles.textInput}
                                        type='text'
                                        value={value.id}
                                        onChange={(e) => handleInputChange(index, 'id', e.target.value)}
                                    />
                                </div>
                            ) : (
                                <div className={styles.rangeInputContainer}>
                                    <div className={styles.values}>
                                        {Array.from({ length: optionsCount }, (_, idx) => {
                                            const currentValue = inputs[id].min + idx * inputs[id].step;
                                            const isActive = currentValue == Number(data[index].value);
                                            return (
                                                <div
                                                    className={`${styles.value} ${isActive ? styles.active : ''}`}
                                                    key={idx}
                                                >
                                                    {`${Number(currentValue)}x`}
                                                    <hr className={styles.line} />
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <input
                                        className={styles.rangeInput}
                                        type='range'
                                        value={Number(value.value)}
                                        min={inputs[id].min}
                                        max={inputs[id].max}
                                        step={inputs[id].step}
                                        onChange={(e) => handleInputChange(index, 'value', e.target.value)}
                                    />
                                </div>
                            )}
                        </div>
                        <div className={styles.buttons}>
                            <i
                                className={`${styles.icon} icon-trash`}
                                onClick={() => setData(data.filter((_, i) => i !== index))}
                            ></i>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
