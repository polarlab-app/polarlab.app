'use server';

export default async function createIssue(title, description, reproduce, category, type, version, priority) {
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
        return 'All values are required';
    }

    if (title.length > 50 || description.length > 800 || reproduce.length > 800) {
        return 'The provided values are too long, the maximum is 50 characters for the title, and 800 for the description & reproduction steps';
    }

    if (!acceptCategories.includes(category)) {
        return 'The provided category is invalid';
    }
    if (!acceptTypes.includes(type)) {
        return 'The provided type is invalid';
    }
    if (!acceptVersions.includes(version)) {
        return 'The provided version is invalid';
    }

    if (!acceptPriorities.includes(priority)) {
        return 'The provided priority is invalid';
    }
}
