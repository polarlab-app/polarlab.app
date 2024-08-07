'use server';

const bcrypt = require('bcrypt');

export default async function hashData(data) {
    try {
        const saltRounds = 9;
        const hash = await bcrypt.hash(data, saltRounds);
        return hash;
    } catch (error) {
        return false;
    }
}
