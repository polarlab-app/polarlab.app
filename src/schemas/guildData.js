import mongoose from 'mongoose';
import { getMongoConnection } from '@/lib/global/db';

const guildDataSchema = new mongoose.Schema(
    {
        id: String,
        name: String,
        icon: String,
        description: String,
        data: mongoose.Schema.Types.Mixed,
        config: mongoose.Schema.Types.Mixed,
    },
    {
        collection: 'guildData',
    }
);
const connection = await getMongoConnection('secondary');

const guildData = connection.mongoose.models.guildData || connection.mongoose.model('guildData', guildDataSchema);
export default guildData;
