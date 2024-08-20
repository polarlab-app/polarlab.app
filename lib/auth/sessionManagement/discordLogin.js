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
            cookies().set('accessToken', response.data.access_token, {
                secure: true,
                path: '/',
                sameSite: true,
            });
            cookies().set('refreshToken', response.data.refresh_token, {
                secure: true,
                path: '/',
                sameSite: true,
            });

            const data = await xior.get('https://discord.com/api/users/@me', {
                headers: {
                    Authorization: `Bearer ${response.data.access_token}`,
                },
            });

            await mongoose.connect(process.env.MONGO_URI || '', {
                authSource: 'admin',
            });

            if (data.status == 200) {
                const existingAccount = await userAccount.findOne({
                    'connections.discord.id': data.data.id.toString(),
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
                    const accountByEmail = await userAccount.findOne({ email: data.data.email });
                    if (accountByEmail) {
                        if (!accountByEmail.connections.some((connection) => connection.name === 'discord')) {
                            accountByEmail.connections.push({
                                id: data.data.id.toString(),
                                name: 'discord',
                                date: new Date().toISOString(),
                                email: data.data.email,
                            });
                            await accountByEmail.save();
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
                            await mongoose.connection.close();
                            redirect('/login');
                        }
                    } else {
                        const newUser = await userAccount.create({
                            id: userId.toString(),
                            username: data.data.username,
                            email: data.data.email,
                            password: 'null',
                            token: await generateToken(),
                            properties: {
                                role: 'user',
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
                        redirect('/login');
                    }
                }
            } else {
                await mongoose.connection.close();
                redirect('/login');
            }
        } else {
            redirect('/login');
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}
