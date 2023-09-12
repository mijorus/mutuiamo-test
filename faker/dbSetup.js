import 'dotenv/config';
import * as db from "../src/db.js";

await db.testConnection();

const { Bank } = await import("../src/models/Bank.js");
const { Product } = await import("../src/models/Product.js");
const { Prospect } = await import("../src/models/Prospect.js");
const { User } = await import("../src/models/User.js");
await db.sqlz.sync({ alter: true });


