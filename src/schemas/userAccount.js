const { Schema, model, models } = require('mongoose');

let userAccountSchema = new Schema(
    {
        id: String,
        username: String,
        password: String,
        pfp: String,
        role: String,
        token: String,
        connections: [
            {
                id: String,
                name: String,
                secret: String,
            },
        ],
    },
    {
        collection: 'accounts',
    }
);

if (!models.userAccount) {
    module.exports = model('userAccount', userAccountSchema);
} else {
    module.exports = models.userAccount;
}
