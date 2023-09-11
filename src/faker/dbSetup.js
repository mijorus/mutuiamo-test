import 'dotenv/config';
import * as db from "../db.js";

await db.testConnection();

const { Bank } = await import("../models/Bank.js");
const { Product } = await import("../models/Product.js");
const { Prospect } = await import("../models/Prospect.js");
const { User } = await import("../models/User.js");
await db.sqlz.sync({ force: true });
