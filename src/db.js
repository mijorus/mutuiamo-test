import { Sequelize } from "sequelize";

export let sqlz = new Sequelize(process.env.DATABASE_URL,);
export async function testConnection() {
    await sqlz.authenticate();
    console.log('Connection to database has been established successfully.');
}