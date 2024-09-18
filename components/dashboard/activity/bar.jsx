'use client';
import styles from '@css/dashboard/activity.module.scss';
import { useState, useEffect } from 'react';
import fetchCases from '@/lib/dashboard/fetchCases';
import Item from './item';

export default function ActivityBar({ type, onClick, id }) {
    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const data = JSON.parse(await fetchCases(type, id));
            setData(data.slice(0, 5));
            console.log(data);
        }

        fetchData();
    }, [type]);

    return (
        <div className={`${styles.bar} ${show ? styles.active : null}`}>
            <div className={styles.header}>
                <i className={`${styles.activityIcon} icon-folders`}></i>
                <p className={styles.heading}>Recent Activity</p>
                <i className={`${styles.upIcon} icon-caret-up`} onClick={() => setShow(!show)}></i>
            </div>
            <div className={styles.items} onClick={onClick}>
                {data ? data.map((item, index) => <Item key={index} item={item} />) : <p>No Data Found</p>}
            </div>
        </div>
    );
}
