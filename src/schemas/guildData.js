const { Schema, model, models } = require('mongoose');

let guildData = new Schema(
    {
        id: String,
        name: String,
        icon: String,
        description: String,
        data: Schema.Types.Mixed,
        config: Schema.Types.Mixed,
    },
    {
        collection: 'guildData',
    }
);

if (!models.guildData) {
    module.exports = model('guildData', guildData);
} else {
    module.exports = models.guildData;
}
