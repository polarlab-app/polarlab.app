'use server';

import argon2 from 'argon2';
export default async function hashData(data) {
    try {
        const hash = await argon2.hash(data, {
            type: argon2.argon2id,
            timeCost: 6,
            memoryCost: 131072,
            parallelism: 8,
            secret: Buffer.from(process.env.HASH_SECRET),
        });
        return hash;
    } catch (error) {
        console.log(error);
        return false;
    }
}
