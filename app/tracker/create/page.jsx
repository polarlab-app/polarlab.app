'use client';

import { useState } from 'react';

import styles from '@/src/css/tracker/create.module.css';
import data from './json.json';

import createIssue from '@/lib/tracker/createIssue';

export default function Page() {
    const [openStatus, setOpenStatus] = useState(false);
    const [error, setError] = useState(null);

    {
        /*I rarely put comments, but man this useState apocalypse lmao*/
    }
    {
        /*It can probably be done in an easier way tbh, buuut im lazy to research that, if anyone has an easier way please submit a PR, or tell me how :D */
    }

    const [selectedTitle, setSelectedTitle] = useState(null);
    const [selectedDescription, setSelectedDescription] = useState(null);
    const [selectedReproduce, setSelectedReproduce] = useState(null);
    const [selectedPriority, setSelectedPriority] = useState(null);
    const [selectedVersion, setSelectedVersion] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const functionMap = {
        Category: setSelectedCategory,
        Priority: setSelectedPriority,
        Version: setSelectedVersion,
        Type: setSelectedType,
    };

    const variableMap = {
        Category: selectedCategory,
        Priority: selectedPriority,
        Version: selectedVersion,
        Type: selectedType,
    };

    const submitIssue = async function (event) {
        event.preventDefault();
        const response = await createIssue(
            selectedTitle,
            selectedDescription,
            selectedReproduce,
            selectedCategory,
            selectedType,
            selectedVersion,
            selectedPriority
        );

        console.log(response);

        if (response.startsWith('E')) {
            setError(response);
            return;
        }

        window.location.assign(`https://polarlab.app/tracker/issue/${response}`);
    };

    return (
        <div className={styles.main}>
            <h1 className={styles.bugtitle}>Create New Issue</h1>
            <hr className={styles.bugdivider}></hr>
            {error ? <p className={styles.errortext}>{error}</p> : null}
            <h2 className={styles.selectionarea}>Issue Basics</h2>
            <div className={styles.section}>
                <h3>Issue Title</h3>
                <input
                    type='text'
                    placeholder='Issue Title'
                    className={styles.input}
                    onChange={(e) => setSelectedTitle(e.target.value)}
                    required></input>
                <h3>Issue Description</h3>
                <textarea
                    type='text'
                    placeholder='Issue Description'
                    className={`${styles.large} ${styles.input}`}
                    onChange={(e) => setSelectedDescription(e.target.value)}></textarea>
                <h3>Reproduction Steps</h3>
                <textarea
                    type='text'
                    placeholder='Reproduction Steps (none if question or enhancement)'
                    className={`${styles.large} ${styles.input}`}
                    onChange={(e) => setSelectedReproduce(e.target.value)}></textarea>
            </div>
            <h2 className={styles.selectionarea}>Issue Details</h2>
            <div className={styles.section}>
                {data.map((menu) => (
                    <div
                        key={menu.id}
                        className={styles.dropdown}
                        onClick={() => {
                            if (openStatus != menu.type) {
                                setOpenStatus(menu.type);
                            } else {
                                setOpenStatus(null);
                            }
                        }}>
                        <h3>Issue {menu.type}</h3>
                        <p className={styles.dropdownselector}>
                            {variableMap[menu.type] ? variableMap[menu.type] : menu.type}
                            <img
                                alt='dropdownArrow'
                                src='https://cdn.polarlab.app/src/docs/img/rightarrow.png'
                                className={
                                    openStatus == menu.type ? styles.dropdownimghidden : styles.dropdownimg
                                }></img>
                        </p>
                        {openStatus == menu.type ? (
                            <ul className={`${styles.dropdownoptions}`}>
                                {menu.options.map((option, index) => (
                                    <li
                                        key={index}
                                        className={styles.dropdownoption}
                                        onClick={() => {
                                            const actualFunction = functionMap[menu.type];
                                            actualFunction(option.name);
                                        }}>
                                        {option.name}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <ul className={`${styles.dropdownoptions} ${styles.dropdownhidden}`}>
                                {menu.options.map((option, index) => (
                                    <li
                                        key={index}
                                        className={styles.dropdownoption}
                                        onClick={() => {
                                            const actualFunction = functionMap[menu.type];
                                            actualFunction(option.name);
                                        }}>
                                        {option.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
            <button className={styles.submitbtn} onClick={submitIssue} type='submit'>
                Create Issue
            </button>
        </div>
    );
}
