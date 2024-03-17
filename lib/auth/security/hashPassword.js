'use server';

const bcrypt = require('bcrypt');

export default async function hashPassword(password) {
    const saltRounds = 9;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
}
