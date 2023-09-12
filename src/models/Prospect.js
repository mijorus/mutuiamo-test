import { sqlz } from '../db.js';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { Bank } from './Bank.js';
import { User } from './User.js';
import { Product } from './Product.js';
import express from "express";

export class CreateProspectError extends Error {
    constructor(message) {
        super(message);
        this.name = "CreateProspectError";
    }
}

export class AlreadySentError extends Error {
    constructor(message) {
        super(message);
        this.name = "AlreadySentError";
    }
}

export class Prospect extends Model {
    /**
     * 
     * @param {express.Request} req
     * @returns {Promise<Prospect>}
     */
    static async createProspectFromRequest(req) {
        const requiredFields = [
            "tan",
            "taeg",
            "subsidiary_code",
            "instalment",
            "bank_id",
            "product_id",
            "user_id",
        ];

        for (let f in requiredFields) {
            if (Object.keys(req.body).includes(f)) {
                throw new CreateProspectError('Missing required field: ' + f);
            }
        }

        const items = {
            bank: await Bank.findOne({ where: { id: req.body.bank_id } }),
            user: await User.findOne({ where: { id: req.body.user_id } }),
            product: await Product.findOne({ where: { id: req.body.product_id } }),
        };

        for (let k in items) {
            if (!items[k]) throw new CreateProspectError('Invalid ' + k);
        }

        const { tan, taeg, subsidiary_code, instalment } = req.body;

        console.log(items.bank.dataValues.requires_subsidiary_code);

        if (items.bank.dataValues.requires_subsidiary_code &&
            !subsidiary_code
        ) {
            throw new CreateProspectError('Bank ' + items.bank.dataValues.name + ' requires subsidiary_code');
        }

        const el = await Prospect.create({
            tan,
            taeg,
            subsidiary_code,
            instalment,
            status: false,
            bank_id: items.bank.id,
            product_id: items.product.id,
            user_id: items.user.id
        });

        return el;
    }

    async send() {
        const bank = await this.getBank();

        if (bank.use_email_for_prospects) {
            // send EMAIL
            console.log('Sending email to ' + bank.email);
        } else {
            // POST request to the API of the bank
            if (!this.status) {
                console.log('Sending prospect to ' + bank.webhook);
                await this.update({'status': 1});
            } else {
                console.log('Prospect already send!');
                throw new AlreadySentError();
            }
        }
    }
}

Prospect.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    tan: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    taeg: {
        type: DataTypes.FLOAT,
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
        type: DataTypes.BIGINT,
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
        type: DataTypes.FLOAT,
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
