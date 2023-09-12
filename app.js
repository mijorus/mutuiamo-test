import 'dotenv/config';
import express from 'express';
import * as db from "./src/db.js";
import bodyParser from "body-parser";

import { router as users } from "./src/routes/api/users.js";
import { router as banks } from "./src/routes/api/banks.js";
import { router as prospects } from "./src/routes/api/prospects.js";

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({}));

app.use('/users', users);
app.use('/banks', banks);
app.use('/prospects', prospects);

async function main() {
    await db.testConnection();
    var server = app.listen(3000, async function () {
        console.log('Listening on port ' + server.address().port);
    });
}

main();