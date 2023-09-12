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
        type: DataTypes.TEXT,
        unique: true
    },
    use_email_for_prospects: {
        type: DataTypes.BOOLEAN,
    },
    requires_subsidiary_code: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    webhook: {
        type: DataTypes.TEXT,
        defaultValue: null
    }
}, { sequelize: sqlz, tableName: 'banks' });