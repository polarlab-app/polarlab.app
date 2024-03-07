const { Schema, model, models } = require('mongoose');

let userAccountSchema = new Schema(
    {
        id: String,
        title: String,
        category: String,
        type: String,
        version: String,
        fixversion: String,
        status: String,
        priority: String,
        description: String,
        reproduce: String,
    },
    {
        collection: 'bugs',
    }
);

if (!models.userAccount) {
    module.exports = model('userAccount', userAccountSchema);
} else {
    module.exports = models.userAccount;
}
