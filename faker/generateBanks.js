import 'dotenv/config';
import * as db from "../src/db.js";
import { Bank } from "../src/models/Bank.js";

async function main() {
    await db.testConnection();

    await Bank.create({
        'name': 'BNL',
        'email': 'send-prospects@bnl.it',
        'use_email_for_prospects': true,
    });

    await Bank.create({
        'name': 'Credit Agricole',
        'email': null,
        'use_email_for_prospects': false,
    });

    await Bank.create({
        'name': 'Sanpaolo',
        'email': null,
        'use_email_for_prospects': false,
    });
}

main();