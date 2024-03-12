'use server';

const bug = require('@/src/schemas/bug.js');
const userAccount = require('@/src/schemas/userAccount.js');
import { cookies } from 'next/headers';

export default async function createIssue(title, description, reproduce, category, type, version, priority) {
    try {
        const cookieStore = cookies();

        const acceptCategories = ['Polaris V2', 'Polar MC', 'Docs', 'Blog', 'Status', 'CDN', 'Login', 'Tracker'];
        const acceptTypes = ['Bug', 'Enhancement', 'Question'];
        const acceptVersions = [
            'V2',
            'V1',
            'V2.4',
            'V2.3',
            'V2.2',
            'V2.1',
            'Latest',
            'Development Version',
            'Other (Specify in Description)',
        ];
        const acceptPriorities = ['Critical', 'High', 'Medium', 'Low', 'Minimal'];

        if (!title || !description || !reproduce || !category || !type || !version || !priority) {
            return 'ERROR: All values are required';
        }

        if (title.length > 50 || description.length > 800 || reproduce.length > 800) {
            return 'ERROR: The provided values are too long, the maximum is 50 characters for the title, and 800 for the description & reproduction steps';
        }

        if (!acceptCategories.includes(category)) {
            return 'ERROR: The provided category is invalid';
        }
        if (!acceptTypes.includes(type)) {
            return 'ERROR: The provided type is invalid';
        }
        if (!acceptVersions.includes(version)) {
            return 'ERROR: The provided version is invalid';
        }

        if (!acceptPriorities.includes(priority)) {
            return 'ERROR: The provided priority is invalid';
        }

        const cookie = cookieStore.get('accountToken');

        if (!cookie) {
            return 'ERROR: You must be logged in to do that';
        }

        const account = await userAccount.findOne({ token: cookie.value });

        if (!account) {
            return 'ERROR: You must be logged in to do that';
        }

        let id = await Math.random().toString(16).substr(2, 6);

        await bug.create({
            id: id,
            author: account.username,
            title: title,
            description: description,
            reproduce: reproduce,
            category: category,
            type: type,
            version: version,
            priority: priority,
            fixversion: 'none',
            status: 'open',
            comments: [],
        });

        return id;
    } catch (error) {
        console.log(error);
        return 'Unknown system error';
    }
}
