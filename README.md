# Mutuiamo - test

This document summarises how to get up and running with this project

## Database setup

The project stores and reads data from a Postgres database.
You should set a `DATABASE_URL` variable in a `.env` file.

### Insert sample data

You can insert sample data in the Database in two ways:

- Launching `node faker/dbSetup.js && node faker/reloadDb.js` from the root folder of the project, which would set up all the tables and insert some dummy data 
- Restoring the included dump file `database-export/mutuiamo.gz`, which includes data generated from the Faker scripts plus some additional data that I personally created while testing the project


## Demo server

First, install all the dependencies

```sh
npm install
```

Then, start the server with:

```sh
node app.js

# use (npm run dev) if you need live-reloading
```

## Use the APIs

List all the banks with:
```
GET /bank
GET /bank/:id
```

List/create users with:
```
GET /users
POST /users
```


List all the products with:
```
GET /products
```

Create a prospect:
```sh
# Prospects have checks depending on the Bank_id 
curl --location 'http://localhost:3000/prospects' \
--header 'Content-Type: application/json' \
--data '{
    "bank_id": "6ea5076c-f542-44a8-970a-a88d55fa4465",
    "product_id": 20,
    "user_id": "a1b9b9e2-3bb0-429c-9416-584d583b5792",
    "tan": 10,
    "taeg": 20,
    "instalment": 400,
    "subsidiary_code": 123
}   ' # This would return the ID of the new Prospect


# Send the prospect you have just created
curl --location --request POST 'http://localhost:3000/prospects/:prospect_id/send'

```


