import { Router } from "express";
import { Bank } from "../../models/Bank.js";

export const router = Router();

router.param('bank', async function (req, res, next, bankId) {
    let data = undefined;

    try {
        data = await Bank.findOne({ where: { id: bankId } });
    } catch (e) {
        console.warn(e);
    }

    if (!data) {
        return res.status(404).json({ message: 'bank not found!' });
    }

    req.bank = data;
    return next();
});

router.get('/:bank', function (req, res) {
    res.json({ data: req.bank });
});

router.get('/', async function (req, res) {
    const data = await Bank.findAll();
    return res.json({ data });
});