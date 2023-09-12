import { Router } from "express";
import { CreateProspectError, Prospect } from "../../models/Prospect.js";

export const router = Router();

router.param('prospect', async function (req, res, next, id) {
    let data = undefined;

    try {
        data = await Prospect.findOne({ where: { id } });
    } catch (e) {
        console.warn(e);
    }

    if (!data) {
        return res.status(404).json({ message: 'Prospect not found!' });
    }

    req.prospect = data;
    return next();
});

router.post('/', async function (req, res) {
    try {
        const data = await Prospect.createProspectFromRequest(req);
        return res.status(201).json({ data: { id: data.id } });
    } catch (e) {
        console.error(e);

        const message = (e instanceof CreateProspectError)
            ? `Invalid prospect: ${e.message}` : 'Invalid prospect';

        return res.status(500).json({ message });
    }
});

router.post('/:prospect/send', async function (req, res) {
    try {
        await req.prospect.send();
        return res.status(200).json({ message: 'Success' });
    } catch (e) {
        if (e.name === 'AlreadySentError') {
            return res.status(208).json({ message: 'Already sent' });
        }

        console.error(e);
        return res.status(500).json({ message: 'Error' });
    }
});

router.get('/:prospect', function (req, res) {
    res.json({ data: req.prospect });
});