import { sqlz } from '../db.js';
import { DataTypes, Model, Sequelize } from 'sequelize';

export const User = sqlz.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    cf: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    finacial_data: {
        type: DataTypes.JSON,
        allowNull: true,
    }
}, {
    tableName: 'users',
    sequelize: sqlz,
});
