'use client';
import styles from '@css/dashboard/arrayInput.module.css';
const { inputs } = require('@data/dashboard.json');
import { useState, useEffect } from 'react';

export default function ArrayInput({ id, values, type, type2, onChange, possibleOptions, icon, exclude }) {
    const optionsCount = Math.floor((inputs[id].max - inputs[id].min) / inputs[id].step) + 1;
    const [data, setData] = useState(values || []);
    const [isOpen1, setIsOpen1] = useState(null);
    const [isOpen2, setIsOpen2] = useState(null);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        if (possibleOptions) {
            setOptions(possibleOptions);
        } else {
            setOptions(inputs[id].options);
        }

        if (data != values && data) {
            onChange(data);
        }

        const setIndexes = () => {
            const containers = document.querySelectorAll(`.${styles.container}`);
            containers.forEach((container, containerIndex) => {
                const parentZIndex = 1000 - 100 * containerIndex;
                container.style.zIndex = parentZIndex;

                const inputs = container.querySelectorAll(`.${styles.input}`);
                inputs.forEach((input, inputIndex) => {
                    input.style.zIndex = parentZIndex - inputIndex;
                });
            });
        };

        setIndexes();
    }, [data, possibleOptions]);

    const handleInputChange = (index, field, value) => {
        const newData = [...data];
        newData[index][field] = value;
        console.log(newData);
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
                            data.length < inputs[id].limit &&
                            setData([...data, { id: '', value: inputs[id].min, status: true }])
                        }
                        disabled={data.length == inputs[id].limit}
                    >
                        Add Item
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
                            {type === 'text' ? (
                                <div className={styles.textInputContainer}>
                                    <input
                                        className={styles.textInput}
                                        type='text'
                                        value={value.id}
                                        placeholder={inputs[id].placeholder}
                                        onChange={(e) => handleInputChange(index, 'id', e.target.value)}
                                    />
                                </div>
                            ) : type === 'radio' ? (
                                <div className={styles.radioInputContainer}>
                                    {inputs[id].options.map((option, idx) => (
                                        <label className={styles.option} key={index}>
                                            <input
                                                type='radio'
                                                id={index}
                                                value={option}
                                                checked={value.id == option}
                                                onChange={(e) => handleInputChange(index, 'id', e.target.value)}
                                                name={id}
                                                className={styles.radioHidden}
                                            />
                                            <span className={styles.radioToggle}>
                                                <span className={styles.radioInnerToggle}></span>
                                            </span>
                                            <span className={styles.radioLabel}>
                                                {option
                                                    .split(/(?=[A-Z])/)
                                                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                                    .join(' ')}{' '}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            ) : type === 'dropdown' ? (
                                <div
                                    className={styles.dropdownContainer}
                                    onClick={() => setIsOpen1(isOpen1 == index ? null : index)}
                                >
                                    <div className={`${styles.dropdown} ${isOpen1 == index ? styles.active : ''}`}>
                                        <p className={styles.dropdownValue}>
                                            {options.find((option) => option.id == value.id)?.name ||
                                                inputs[id].placeholder}
                                        </p>
                                        <i className={`${styles.dropdownIcon} icon-caret-up`}></i>
                                    </div>
                                    <div className={styles.dropdownOptions}>
                                        {options
                                            .filter(
                                                (option) =>
                                                    !exclude || !exclude.split(';').includes(option.type.toString())
                                            )
                                            .some((option) => option.rawPosition)
                                            ? options
                                                  .filter(
                                                      (option) =>
                                                          !exclude ||
                                                          !exclude.split(';').includes(option.type.toString())
                                                  )
                                                  .sort((a, b) => (b.rawPosition || 0) - (a.rawPosition || 0))
                                                  .map((option, idx) => (
                                                      <div
                                                          className={styles.dropdownOption}
                                                          key={idx}
                                                          onClick={() => {
                                                              handleInputChange(index, 'id', option.id);
                                                              setIsOpen1(false);
                                                          }}
                                                          style={option.color ? { color: option.color } : null}
                                                      >
                                                          {icon ? (
                                                              <i className={`${styles.infoIcon} ${icon}`}></i>
                                                          ) : null}
                                                          {option.name}
                                                      </div>
                                                  ))
                                            : options
                                                  .filter(
                                                      (option) =>
                                                          !exclude ||
                                                          !exclude.split(';').includes(option.type.toString())
                                                  )
                                                  .map((option, idx) => (
                                                      <div
                                                          className={styles.dropdownOption}
                                                          key={idx}
                                                          onClick={() => handleInputChange(index, 'id', option.id)}
                                                          style={
                                                              option.color
                                                                  ? { color: `#${option.color.toString(16)}` }
                                                                  : null
                                                          }
                                                      >
                                                          {icon ? (
                                                              <i className={`${styles.infoIcon} ${icon}`}></i>
                                                          ) : null}
                                                          {option.name}
                                                      </div>
                                                  ))}
                                    </div>
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
                                        onChange={(e) => handleInputChange(index, 'id', e.target.value)}
                                    />
                                </div>
                            )}
                        </div>
                        <div className={styles.second}>
                            {type2 === 'text' ? (
                                <div className={styles.textInputContainer}>
                                    <input
                                        className={styles.textInput}
                                        type='text'
                                        value={value.value}
                                        onChange={(e) => handleInputChange(index, 'value', e.target.value)}
                                        placeholder={inputs[id].placeholder2}
                                    />
                                </div>
                            ) : type2 === 'radio' ? (
                                <div className={styles.radioInputContainer}>
                                    {inputs[id].options.map((option, idx) => (
                                        <label className={styles.option} key={idx}>
                                            <input
                                                type='radio'
                                                id={index}
                                                value={option}
                                                checked={value.value == option}
                                                onChange={(e) => handleInputChange(index, 'value', e.target.value)}
                                                name={index}
                                                className={styles.radioHidden}
                                            />
                                            <span className={styles.radioToggle}>
                                                <span className={styles.radioInnerToggle}></span>
                                            </span>
                                            <span className={styles.radioLabel}>
                                                {option
                                                    .split(/(?=[A-Z])/)
                                                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                                    .join(' ')}{' '}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            ) : type2 === 'dropdown' ? (
                                <div
                                    className={styles.dropdownContainer}
                                    onClick={() => setIsOpen2(isOpen2 == index ? null : index)}
                                >
                                    <div className={`${styles.dropdown} ${isOpen2 == index ? styles.active : ''}`}>
                                        <p className={styles.dropdownValue}>
                                            {options.find((option) => option.id == value.value)?.name ||
                                                inputs[id].placeholder2}
                                        </p>
                                        <i className={`${styles.dropdownIcon} icon-caret-up`}></i>
                                    </div>
                                    <div className={styles.dropdownOptions}>
                                        {options
                                            .filter(
                                                (option) =>
                                                    !exclude || !exclude.split(';').includes(option.type.toString())
                                            )
                                            .some((option) => option.rawPosition)
                                            ? options
                                                  .filter(
                                                      (option) =>
                                                          !exclude ||
                                                          !exclude.split(';').includes(option.type.toString())
                                                  )
                                                  .sort((a, b) => (b.rawPosition || 0) - (a.rawPosition || 0))
                                                  .map((option, idx) => (
                                                      <div
                                                          className={styles.dropdownOption}
                                                          key={idx}
                                                          onClick={() => {
                                                              handleInputChange(index, 'value', option.id);
                                                              setIsOpen2(false);
                                                          }}
                                                          style={option.color ? { color: option.color } : null}
                                                      >
                                                          {icon ? (
                                                              <i className={`${styles.infoIcon} ${icon}`}></i>
                                                          ) : null}
                                                          {option.name}
                                                      </div>
                                                  ))
                                            : options
                                                  .filter(
                                                      (option) =>
                                                          !exclude ||
                                                          !exclude.split(';').includes(option.type.toString())
                                                  )
                                                  .map((option, idx) => (
                                                      <div
                                                          className={styles.dropdownOption}
                                                          key={idx}
                                                          onClick={() => {
                                                              handleInputChange(index, 'value', option.id);
                                                              setIsOpen2(false);
                                                          }}
                                                          style={
                                                              option.color
                                                                  ? { color: `#${option.color.toString(16)}` }
                                                                  : null
                                                          }
                                                      >
                                                          {icon ? (
                                                              <i className={`${styles.infoIcon} ${icon}`}></i>
                                                          ) : null}
                                                          {option.name}
                                                      </div>
                                                  ))}
                                    </div>
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
                            <label className={styles.checkContainer}>
                                <input
                                    id={id}
                                    type='checkbox'
                                    className={styles.hidden}
                                    onChange={(e) => handleInputChange(index, 'status', !value.status)}
                                    checked={value.status}
                                ></input>
                                <span className={styles.toggle}>
                                    <span className={styles.innerToggle}></span>
                                </span>
                            </label>
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
