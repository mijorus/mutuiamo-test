import "dotenv/config";
import { Prospect } from "../src/models/Prospect";
import { jest } from '@jest/globals';
import { Bank } from "../src/models/Bank";
import { User } from "../src/models/User";
import { Product } from "../src/models/Product";


test('Fails if missing one of the Required fields', async () => {
    const requiredFields = [
        "tan",
        "taeg",
        "instalment",
        "bank_id",
        "product_id",
        "user_id",
    ];

    for (let i = 0; i < requiredFields.length; i++) {
        const partialRequest = [...requiredFields];
        partialRequest.splice(i, 1);

        const req = { body: {} };

        partialRequest.forEach(el => req.body[el] = '<test>');

        await expect(async () => {
            // console.log('Testing lack of ' + requiredFields[i]);
            await Prospect.createProspectFromRequest(req);
        }).rejects.toThrow();
    }
});

test('Missing subsidiary code', async () => {
    const b = await Bank.findOne({ where: { requires_subsidiary_code: true } });
    const u = await User.findOne({});
    const p = await Product.findOne({});

    await expect(async () => {
        await Prospect.createProspectFromRequest({
            body: {
                "bank_id": b.id,
                "product_id": p.id,
                "user_id": u.id,
                "tan": 10,
                "taeg": 20,
                "instalment": 400
            }
        });
    }).rejects.toThrow();
});

test('Create prospect succesfully', async () => {
    const b = await Bank.findOne({ where: { requires_subsidiary_code: false } });
    const u = await User.findOne({});
    const p = await Product.findOne({});

    const newProspect = await Prospect.createProspectFromRequest({
        body: {
            "bank_id": b.id,
            "product_id": p.id,
            "user_id": u.id,
            "tan": 10,
            "taeg": 20,
            "instalment": 400
        }
    });

    expect(newProspect).toBeInstanceOf(Prospect);
});
