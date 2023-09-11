import { DataTypes, Model } from 'sequelize';
import { sqlz } from '../db.js';

export const Bank = sqlz.define('Bank', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.TEXT,
    },
    email: {
        type: DataTypes.TEXT
    },
    use_email_for_prospects: {
        type: DataTypes.BOOLEAN,
    }
}, { sequelize: sqlz, tableName: 'banks' });