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
        },
        connections: [
            {
                id: String,
                name: String,
                date: String,
                email: String,
            },
        ],
        authorizedApps: [
            {
                id: String,
                name: String,
                date: String,
                secret: String,
                scopes: [],
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
