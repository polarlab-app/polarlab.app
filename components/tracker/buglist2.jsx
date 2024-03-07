'use client';

import styles from '../../src/css/tracker/list.module.css';
import { useState, useEffect } from 'react';
export default function BugList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [bugs, setBugs] = useState([]);

    useEffect(() => {
        const manageIssues = async () => {
            const getBugs = await fetch('https://localhost:3000/api/tracker/getall', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            let bugsJSON = await getBugs.json();

            return bugsJSON.bugsArray;
        };

        manageIssues().then((bugsArray) => setBugs(bugsArray));
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    let totalPages = Math.ceil(bugs.length / 5);

    let startIndex = (currentPage - 1) * 5;
    let endIndex = startIndex + 5;
    let currentPageBugs = bugs.slice(startIndex, endIndex);

    return (
        <div className={styles.buglist}>
            <div className={styles.selector}>
                <input type='search' className={styles.search} placeholder='Search'></input>
                <div className={styles.filters}>
                    <button className={styles.sort}>Sort By</button>
                    <ul className={styles.sortoptions}>
                        <li className={styles.sortoption}>Title</li>
                        <li className={styles.sortoption}>Type</li>
                    </ul>
                </div>
            </div>
            <div className={styles.bug}>
                <div className={styles.bugtop}>
                    <p className={styles.bugheader}>Autoplay Not Working</p>
                    <div className={`${styles.bugtag} ${styles.bugrepo}`}>Polaris V2</div>
                    <div className={`${styles.bugtag} ${styles.bugissue}`}>Bug</div>
                </div>
                <div className={styles.bugbottom}>
                    <p className={styles.issueid}>#12098hs</p>
                    <p className={styles.issuedescription}>The autoplay command returns a valule of undefined and</p>
                </div>
            </div>
            <div className={styles.pagination}>
                {[...Array(totalPages).keys()].map((pageNumber) => (
                    <a
                        key={pageNumber}
                        href='#'
                        className={styles.page}
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(pageNumber + 1);
                        }}>
                        {pageNumber + 1}
                    </a>
                ))}
            </div>
        </div>
    );
}
