'use server';

const bcrypt = require('bcrypt');

export default async function checkHash(plainText, hash) {
    const match = await bcrypt.compare(plainText, hash);
    return match;
}
