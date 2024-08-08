'use server';

import crypto from 'crypto';

export default async function generateToken() {
    try {
        const tokenBytes = crypto.randomBytes(96);
        const token = tokenBytes.toString('base64url');
        return 'TKN::' + token;
    } catch (error) {
        return false;
    }
}
