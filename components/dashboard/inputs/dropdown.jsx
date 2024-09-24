'use client';
import styles from '@css/dashboard/dropdown.module.scss';
import { useState, useEffect } from 'react';
const { inputs } = require('@data/dashboard.json');

export default function DropdownInput({ id, value, onChange, width, possibleOptions, exclude, icon }) {
    const [selectedValue, setSelectedValue] = useState(value);
    const [isOpen, setIsOpen] = useState(false);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        if (possibleOptions) {
            setOptions(possibleOptions);
        } else {
            setOptions(inputs[id].options);
        }
        if (value) {
            setSelectedValue(value);
        }
    }, [possibleOptions, value, id]);

    return (
        <div className={`${styles.container} ${width == 'half' ? styles.half : null}`}>
            <div className={styles.header}>
                <p className={styles.heading}>{inputs[id].name}</p>
                <p className={styles.description}>{inputs[id].description}</p>
            </div>
            <div className={`${styles.dropdownContainer} ${width == 'half' ? styles.half : null}`}>
                <div
                    className={`${styles.dropdown} ${isOpen ? styles.active : null}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <p className={styles.dropdownValue}>
                        {selectedValue
                            ? options.find((option) => option.id === selectedValue)?.name || inputs[id].placeholder
                            : inputs[id].placeholder}
                    </p>
                    <i className={`${styles.dropdownIcon} icon-caret-up`}></i>
                </div>
                <div
                    className={styles.dropdownOptions}
                    onClick={() => {
                        setIsOpen(false);
                    }}
                >
                    {options
                        .filter((option) => !exclude || !exclude.split(';').includes(option.type.toString()))
                        .some((option) => option.rawPosition)
                        ? options
                              .filter((option) => !exclude || !exclude.split(';').includes(option.type.toString()))
                              .sort((a, b) => (a.rawPosition || 0) - (b.rawPosition || 0))
                              .map((option, index) => (
                                  <div
                                      className={styles.dropdownOption}
                                      key={index}
                                      id={id}
                                      o={option.id.toString()}
                                      onClick={(e) => {
                                          onChange(e.target.id, option.id);
                                          setSelectedValue(option.id);
                                      }}
                                  >
                                      {icon ? <i className={`${styles.icon} ${icon}`}></i> : null}
                                      {option.name}
                                  </div>
                              ))
                        : options
                              .filter((option) => !exclude || !exclude.split(';').includes(option.type.toString()))
                              .map((option, index) => (
                                  <div
                                      className={styles.dropdownOption}
                                      key={index}
                                      id={id}
                                      value={option.id}
                                      onClick={(e) => {
                                          onChange(e.target.id, option.id);
                                          setSelectedValue(option.id);
                                      }}
                                  >
                                      {icon ? <i className={`${styles.icon} ${icon}`}></i> : null}
                                      {option.name}
                                  </div>
                              ))}
                </div>
            </div>
        </div>
    );
}
