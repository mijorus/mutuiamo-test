import 'dotenv/config';
import * as db from "../src/db.js";
import { User } from "../src/models/User.js";
import { faker } from "@faker-js/faker";

async function main() {
    await db.testConnection();

    for (let i = 0; i < 10; i++) {
        await User.create({
            'name': faker.person.fullName(),
            'cf': faker.random.alpha(14),
            'financial_data': {},
        })
    }
}

main();