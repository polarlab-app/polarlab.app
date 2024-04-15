'use client';

import styles from '@css/tracker/list.module.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import getAllBugs from '@/lib/tracker/getAllBugs';

export default function BugList() {
    const router = useRouter();

    const [currentPage, setCurrentPage] = useState(1);
    const [bugs, setBugs] = useState([]);

    useEffect(() => {
        const manageIssues = async () => {
            const issues = await getAllBugs();
            return issues;
        };

        manageIssues().then((issues) => setBugs(JSON.parse(issues)));
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const totalPages = Math.ceil(bugs.length / 5);
    const startIndex = (currentPage - 1) * 5;
    const endIndex = startIndex + 5;
    const currentPageBugs = bugs.slice(startIndex, endIndex);

    return (
        <div className={styles.buglist} id='buglist'>
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
            {currentPageBugs.map((issue) => (
                <div className={styles.bug} key={issue.id} onClick={() => router.push(`/tracker/issue/${issue.id}`)}>
                    <div className={styles.bugtop}>
                        <p className={styles.bugheader}>{issue.title}</p>
                        <div className={styles.bugtags}>
                            <div className={`${styles.bugtag} ${styles.bugrepo}`}>{issue.category}</div>
                            <div className={`${styles.bugtag} ${styles[issue.type]}`}>{issue.type}</div>
                        </div>
                    </div>
                    <div className={styles.bugbottom}>
                        <p className={styles.issueid}>#{issue.id}</p>
                        <p className={styles.issuedescription}>{issue.description}</p>
                    </div>
                </div>
            ))}
            <div className={styles.pagination}>
                {[...Array(totalPages).keys()].map((pageNumber) => (
                    <a
                        key={pageNumber}
                        href='#'
                        className={`${styles.page} ${pageNumber + 1 === currentPage ? styles.active : ''}`}
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
