'use client';
import styles from '@css/dashboard/dropdown.module.scss';
import { useState } from 'react';
const { inputs } = require('@data/dashboard.json');

export default function DropdownInput({ id, value, onChange, width, possibleOptions }) {
    const [selectedValue, setSelectedValue] = useState(value);
    const [isOpen, setIsOpen] = useState(false);
    const [options, setOptions] = useState(possibleOptions || inputs[id].options);

    return (
        <div className={`${styles.container} ${width == 'half' ? styles.half : null}`}>
            <div className={styles.header}>
                <p className={styles.heading}>{inputs[id].name}</p>
                <p className={styles.description}>{inputs[id].description}</p>
            </div>
            <div className={styles.dropdownContainer}>
                <div
                    className={`${styles.dropdown} ${isOpen ? styles.active : null}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <p className={styles.dropdownValue}>
                        {selectedValue
                            ? selectedValue
                                  .split(/(?=[A-Z])/)
                                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                  .join(' ') || inputs[id].placeholder
                            : inputs[id].placeholder}
                    </p>
                    <i className={`${styles.dropdownIcon} icon-caret-up`}></i>
                </div>
                <div className={styles.dropdownOptions}>
                    {options.map((option, index) => (
                        <div
                            className={styles.option}
                            key={index}
                            id={id}
                            value={option.id}
                            onClick={(e) => {
                                setIsOpen(false);
                                onChange(e);
                                setSelectedValue(option.name);
                            }}
                        >
                            {option.name
                                .split(/(?=[A-Z])/)
                                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                .join(' ') || inputs[id].placeholder}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
