'use server';
import app from '@schemas/app';

export default async function validateAppName(appName) {
    try {
        if (appName.length > 16) {
            return JSON.stringify({
                h: 'Action Failed',
                d: 'App name must not contain more than 16 characters',
                c: 'r',
                s: false,
            });
        }

        const existingApp = await app.findOne({ name: appName });

        if (existingApp) {
            return JSON.stringify({ h: 'Action Failed', d: 'App name already taken', c: 'r', s: false });
        }

        return JSON.stringify({ s: true });
    } catch (error) {
        return JSON.stringify({ h: 'Action Failed', d: 'An internal error has occurred', c: 'r', s: false });
    }
}
