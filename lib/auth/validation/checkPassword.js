'use server';

const bcrypt = require('bcrypt');

export default async function checkPassword(plainPassword, hashedPassword) {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
}
