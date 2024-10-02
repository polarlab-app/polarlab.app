'use server';
import mongoose from 'mongoose';
const globalConnections = global.connections || {};

export default async function connectToMongo(uri, connName) {
    if (globalConnections[connName]) {
        return globalConnections[connName];
    }

    const connection = await mongoose
        .createConnection(uri, {
            authSource: 'admin',
        })
        .asPromise();

    globalConnections[connName] = connection;
    global.connections = globalConnections;

    return connection;
}

export async function getMongoConnection(connName) {
    if (!globalConnections[connName]) {
        if (connName === 'primary') {
            await connectToMongo(process.env.MONGO_URI, connName);
            return globalConnections[connName];
        } else if (connName === 'secondary') {
            await connectToMongo(process.env.BOT_DB_URI, connName);
            return globalConnections[connName];
        }
        console.log(`Connection "${connName}" not established yet.`);
    }
    return globalConnections[connName];
}
