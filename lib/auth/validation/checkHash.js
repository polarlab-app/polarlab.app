'use server';
import argon2 from 'argon2';

export default async function checkHash(plainText, hash) {
    try {
        const match = await argon2.verify(hash, plainText, {
            secret: Buffer.from(process.env.HASH_SECRET),
        });
        return match;
    } catch (error) {
        console.log(error);
        return false;
    }
}
