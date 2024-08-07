'use server';

export default async function generateSecret() {
    try {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567890123456789';
        let result = '';
        for (let i = 0; i < 16; i++) {
            result += 'SCT::' + chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    } catch (error) {
        return false;
    }
}
