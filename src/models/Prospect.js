import { sqlz } from '../db.js';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { Bank } from './Bank.js';
import { User } from './User.js';
import { Product } from './Product.js';

export const Prospect = sqlz.define('Prospect', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    tan: {
        type: DataTypes.NUMERIC,
        allowNull: false,
    },
    taeg: {
        type: DataTypes.NUMERIC,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    bank_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'banks',
            key: 'id',
        },
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    product_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id',
        },
    },
    subsidiary_code: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    instalment: {
        type: DataTypes.REAL,
        allowNull: false,
    },
}, {
    tableName: 'prospects', // Set the table name explicitly to match your SQL definition
    sequelize: sqlz,
});

// Define the foreign key relationships
Prospect.belongsTo(Bank, {
    foreignKey: 'bank_id',
});

Prospect.belongsTo(User, {
    foreignKey: 'user_id',
});

Prospect.belongsTo(Product, {
    foreignKey: 'product_id',
});
