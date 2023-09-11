import 'dotenv/config';
import express from 'express';
import * as db from "./src/db.js";
import bodyParser from "body-parser";

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

async function main() {
    await db.testConnection();
    var server = app.listen(3000, async function () {
        console.log('Listening on port ' + server.address().port);
    });
}

main();