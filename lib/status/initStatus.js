'use client';
import { useState } from 'react';
import statusFile from '@data/status.json';
import checkStatus from './checkStatus';

export default function InitStatus() {
    const [statuses, setStatuses] = useState({});
    const fetchStatuses = async () => {
        const newStatuses = {};
        for (const [key, url] of Object.entries(statusFile.pages)) {
            const status = await checkStatus(url);
            newStatuses[key] = status;
        }
        setStatuses(newStatuses);
    };

    fetchStatuses();
    return statuses;
}
