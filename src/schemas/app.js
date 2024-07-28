const { Schema, model, models } = require('mongoose');

let appSchema = new Schema(
    {
        id: String,
        ownerId: String,
        pfp: String,
        name: String,
        secret: String,
        redirectUri: String,
    },
    {
        collection: 'apps',
    }
);

if (!models.app) {
    module.exports = model('appSchema', appSchema);
} else {
    module.exports = models.app;
}
