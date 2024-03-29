const { Schema, model, models } = require('mongoose');

let bugSchema = new Schema(
    {
        id: String,
        author: String,
        title: String,
        description: String,
        reproduce: String,
        category: String,
        type: String,
        version: String,
        fixversion: String,
        status: String,
        priority: String,

        comments: [
            {
                username: String,
                comment: String,
            },
        ],
    },
    {
        collection: 'bugs',
    }
);

if (!models.bugSchema) {
    module.exports = model('bugSchema', bugSchema);
} else {
    module.exports = models.bugSchema;
}
