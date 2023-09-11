import 'dotenv/config';
import {faker} from "@faker-js/faker";
import * as db from "../db.js";
import { Bank } from "../models/Bank.js";
import { Product } from '../models/Product.js';

async function main() {
    const banks = await Bank.findAll();
    for (let i = 0; i < 40; i++) {
        await Product.create({
            name: 'Product #' + i,
            details: '',
            bank_id: (faker.helpers.arrayElement(banks)).dataValues.id
        })
    }
}

main();