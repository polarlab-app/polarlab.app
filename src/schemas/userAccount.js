import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

let userAccountSchema = new Schema(
    {
        id: String,
        username: String,
        password: String,
        pfp: String,
        role: String,
        token: String,
        discordId: String,
        authorized_apps: [
            {
                id: String,
                name: String,
                secret: String,
                redirect_uri: String,
            },
        ],
    },
    {
        collection: 'accounts',
    }
);

const userAccount = models.userAccount || model('userAccount', userAccountSchema);
export default userAccount;
