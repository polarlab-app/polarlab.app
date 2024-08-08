import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

let userAccountSchema = new Schema(
    {
        id: String,
        username: String,
        email: String,
        password: String,
        token: String,
        properties: {
            role: String,
            pfp: String,
        },
        connections: [
            {
                id: String,
                name: String,
                date: String,
                email: String,
            },
        ],
        authorized_apps: [
            {
                id: String,
                name: String,
                date: String,
                secret: String,
            },
        ],
        support: [],
    },
    {
        collection: 'accounts',
    }
);

const userAccount = models.userAccount || model('userAccount', userAccountSchema);
export default userAccount;
