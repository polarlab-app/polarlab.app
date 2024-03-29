'use server';

const bcrypt = require('bcrypt');

export default async function hashData(data) {
    const saltRounds = 9;
    const hash = await bcrypt.hash(data, saltRounds);
    return hash;
}
