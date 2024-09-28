'use server';
import app from '@schemas/app';
export default async function findApp(appId) {
    const appDocument = await app.findOne({ id: appId });
    if (!appDocument) {
        return JSON.stringify({
            h: 'Action Failed',
            d: 'The app you are looking for does not exist',
            c: 'r',
            s: false,
        });
    }
    return JSON.stringify(appDocument) || false;
}
