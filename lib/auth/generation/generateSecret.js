'use server';

import crypto from 'crypto';

export default async function generateSecret() {
    try {
        const secretBytes = crypto.randomBytes(8);
        const secret = secretBytes.toString('hex');
        return 'SCT::' + secret;
    } catch (error) {
        return false;
    }
}
