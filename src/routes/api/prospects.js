import { Router } from "express";
import { CreateProspectError, Prospect } from "../../models/Prospect.js";
import { Bank } from "../../models/Bank.js";

export const router = Router();

router.post('/', async function (req, res) {
    try {
        const data = Prospect.createProspect(req);
        return res.json({ data: { id: data.id } });
    } catch (e) {
        console.error(e);

        const message = (e instanceof CreateProspectError) 
            ? `Invalid prospect: ${e.message}` : 'Invalid prospect';

        return res.status(500).json({ message });
    }
});