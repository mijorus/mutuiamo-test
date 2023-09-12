import { sqlz } from '../db.js';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { Bank } from './Bank.js';

export const Product = sqlz.define('Product', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    details: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    bank_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'banks',
            key: 'id',
        },
    }
}, {
    tableName: 'products',
    sequelize: sqlz,
});

// Define the foreign key relationship
Product.belongsTo(Bank, {
    foreignKey: 'bank_id',
});