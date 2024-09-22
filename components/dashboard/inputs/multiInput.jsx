'use client';
import styles from '@css/dashboard/multiInput.module.scss';
import { useState, useEffect, useRef } from 'react';
const { inputs } = require('@data/dashboard.json');

export default function MultiInput({ id, values, possibleOptions, onChange, icon, width }) {
    const [selectedValues, setSelectedValues] = useState([]);
    const [options, setOptions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const selection = useRef(null);

    useEffect(() => {
        if (values) {
            setSelectedValues(values);
        }
        if (possibleOptions) {
            setOptions(possibleOptions);
        } else {
            setOptions(inputs[id].options);
        }
    }, []);
    return (
        <div
            className={`${styles.container} ${width == 'half' ? styles.half : null}`}
            onClick={(e) => {
                if (e.target.id != 'selectedOption' && e.target.id != 'possibleOption' && e.target.id != 'selector')
                    setIsOpen(false);
            }}
        >
            <div className={`${styles.header} ${width == 'half' ? styles.half : null}`}>
                <p className={styles.heading}>{inputs[id].name}</p>
                <p className={styles.description}>{inputs[id].description}</p>
            </div>
            <div
                className={`${styles.multiInputContainer} ${isOpen ? styles.active : null}  ${
                    width == 'half' ? styles.half : null
                }`}
            >
                <div className={styles.selectedContainer}>
                    <div
                        className={styles.button}
                        onClick={() => {
                            if (selection.current.scrollLeft > 0) {
                                selection.current.scrollBy({
                                    left: selection.current.clientWidth * -0.9,
                                    behavior: 'smooth',
                                });
                            }
                        }}
                    >
                        <i className={`${styles.buttonIcon} icon-caret-up`}></i>
                    </div>
                    <div
                        className={`${styles.selected} ${isOpen ? styles.active : null}`}
                        onClick={(e) => {
                            if (e.target.id != 'selectedOption' && e.target.id != 'possibleOption') {
                                setIsOpen(!isOpen);
                            }
                        }}
                        id='selector'
                        ref={selection}
                    >
                        {selectedValues != [] ? (
                            selectedValues.map((selectedValue, index) => (
                                <div
                                    className={styles.selectedValue}
                                    key={index}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setSelectedValues(selectedValues.filter((value) => value !== selectedValue));
                                        onChange(
                                            id,
                                            selectedValues.filter((value) => value !== selectedValue)
                                        );
                                    }}
                                    id='selectedOption'
                                >
                                    {options.find((option) => option.id === selectedValue)?.name || selectedValue}
                                </div>
                            ))
                        ) : (
                            <p>{inputs[id].placeholder}</p>
                        )}
                    </div>
                    <div
                        className={styles.button}
                        onClick={() => {
                            if (
                                selection.current.scrollLeft <
                                selection.current.scrollWidth - selection.current.clientWidth
                            )
                                selection.current.scrollBy({
                                    left: selection.current.clientWidth * 0.9,
                                    behavior: 'smooth',
                                });
                        }}
                    >
                        <i className={`${styles.buttonIcon} icon-caret-up`}></i>
                    </div>
                </div>
                <div className={`${styles.dropdownOptions} ${isOpen ? styles.active : null}`}>
                    {options
                        .filter((option) => !selectedValues.includes(option.id))
                        .map((option, index) => (
                            <div
                                className={styles.dropdownOption}
                                key={index}
                                onClick={() => {
                                    setSelectedValues([...selectedValues, option.id]);
                                    onChange(id, [...selectedValues, option.id]);
                                }}
                                id='possibleOption'
                            >
                                {icon ? <i className={`${icon} ${styles.icon}`}></i> : null}
                                {option.name}
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
