'use server';
export default async function getStatus(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok ? 'online' : 'offline';
    } catch (error) {
        console.error('Error checking status:', error);
        return 'offline';
    }
}
