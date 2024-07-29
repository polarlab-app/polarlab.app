import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const guildDataSchema = new Schema(
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

const guildData = models.guildDataSchema || model('guildData', guildDataSchema);
export default guildData;
