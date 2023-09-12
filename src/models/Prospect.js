import { sqlz } from '../db.js';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { Bank } from './Bank.js';
import { User } from './User.js';
import { Product } from './Product.js';
import { Request } from "express";

export class CreateProspectError extends Error {
    constructor(message) {
        super(message);
        this.name = "CreateProspectError";
    }
}

export class Prospect extends Model {
    /**
     * 
     * @param {Request} req
     * @returns {Prospect}
     */
    static async createProspectFromRequest(req) {
        const requestItems = {
            bank: await Bank.findOne({ where: { id: req.bank_id } }),
            user: await User.findOne({ where: { id: req.user_id } }),
            product: await Product.findOne({ where: { id: req.product_id } })
        };

        for (let key in requestItems) {
            if (!key) throw new CreateProspectError('Invalid ' + key);
        }

        const { tan, taeg, subsidiary_code, instalment } = req.body;
        const el = await Prospect.create({
            tan,
            taeg,
            subsidiary_code,
            instalment,
            status: false,
            bank_id: bank.id,
            product: product.id,
            user: user.id
        });

        return el;
    }
}

Prospect.init({
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
