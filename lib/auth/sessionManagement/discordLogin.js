'use server';

import { cookies } from 'next/headers';
import xior from 'xior';
import { redirect } from 'next/navigation';
import mongoose from 'mongoose';
import userAccount from '@schemas/userAccount';
import generateToken from '../generation/generateToken';
import generateUserId from '../generation/generateUserId';

export default async function discordLogin(code) {
    try {
        const userId = await generateUserId();
        const response = await xior.post(
            'https://discord.com/api/oauth2/token',
            {
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                grant_type: 'authorization_code',
                code,
                redirect_uri: process.env.CALLBACK_URI,
                scope: 'identify guilds email',
            },
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        if (response.status === 200) {
            const data = await xior.get('https://discord.com/api/users/@me', {
                headers: {
                    Authorization: `Bearer ${response.data.access_token}`,
                },
            });
            if (data.status === 200) {
                await mongoose.connect(process.env.MONGO_URI || '', {
                    authSource: 'admin',
                });

                const existingAccount = await userAccount.findOne({
                    'connections.name': 'discord',
                    'connections.id': data.data.id.toString(),
                });
                if (existingAccount) {
                    cookies().set('accountToken', existingAccount.token, {
                        secure: true,
                        path: '/',
                        maxAge: 1209600,
                        sameSite: true,
                    });
                    cookies().set('username', existingAccount.username, {
                        secure: true,
                        path: '/',
                        maxAge: 1209600,
                        sameSite: true,
                    });
                    await mongoose.connection.close();
                    redirect('/personal');
                } else {
                    const loggedInAccount = cookies().get('accountToken');
                    if (loggedInAccount) {
                        const account = await userAccount.findOne({ token: loggedInAccount.value });
                        if (account && !account.connections.some((conn) => conn.name === 'discord')) {
                            account.connections.push({
                                id: data.data.id.toString(),
                                name: 'discord',
                                date: new Date().toISOString(),
                                email: data.data.email,
                            });
                            await account.save();
                            cookies().set('accountToken', account.token, {
                                secure: true,
                                path: '/',
                                maxAge: 1209600,
                                sameSite: true,
                            });
                            cookies().set('username', account.username, {
                                secure: true,
                                path: '/',
                                maxAge: 1209600,
                                sameSite: true,
                            });
                            await mongoose.connection.close();
                            redirect('/personal');
                        } else {
                            await mongoose.connection.close();
                            redirect('/login');
                        }
                    }

                    const accountByEmail = await userAccount.findOne({
                        email: data.data.email,
                    });
                    if (accountByEmail && !accountByEmail.connections.some((conn) => conn.name === 'discord')) {
                        cookies().set('accountToken', accountByEmail.token, {
                            secure: true,
                            path: '/',
                            maxAge: 1209600,
                            sameSite: true,
                        });
                        cookies().set('username', accountByEmail.username, {
                            secure: true,
                            path: '/',
                            maxAge: 1209600,
                            sameSite: true,
                        });
                        await mongoose.connection.close();
                        redirect('/personal');
                    } else {
                        const newUser = await userAccount.create({
                            id: userId.toString(),
                            username: data.data.username,
                            email: data.data.email,
                            password: 'null',
                            token: await generateToken(),
                            properties: {
                                role: 'user',
                                date: new Date().toISOString(),
                            },
                            connections: [
                                {
                                    id: data.data.id.toString(),
                                    name: 'discord',
                                    date: new Date().toISOString(),
                                    email: data.data.email,
                                },
                            ],
                            authorized_apps: [],
                            support: [],
                        });
                        cookies().set('accountToken', newUser.token, {
                            secure: true,
                            path: '/',
                            maxAge: 1209600,
                            sameSite: true,
                        });
                        cookies().set('username', newUser.username, {
                            secure: true,
                            path: '/',
                            maxAge: 1209600,
                            sameSite: true,
                        });
                        await mongoose.connection.close();
                        redirect('/personal');
                    }
                }
            } else {
                redirect('/login');
            }
        } else {
            redirect('/login');
        }
    } catch (error) {
        if (error.message !== 'NEXT_REDIRECT') {
            console.error('An error occurred:', error);
            return false;
        }
        throw error;
    }
}
