import { Router } from "express";
import { User } from "../../models/User.js";

export const router = Router();

router.param('user', async function (req, res, next, userId) {
    let u = undefined;

    try {
        u = await User.findOne({ where: { id: userId } });
    } catch (e) {
        console.warn(e);
    }

    if (!u) {
        return res.status(404).json({ message: 'User not found!' });
    }

    req.user = u;
    return next();
});

router.get('/:user', function (req, res) {
    res.json({ user: req.user });
});

router.get('/', async function (req, res) {
    const users = await User.findAll();
    return res.json(users);
});

router.post('/', async function (req, res) {
    if (!req.body.cf || (await User.findOne({ where: { cf: req.body.cf } }))) {
        return res.status(500).json({
            message: 'User already exists!'
        });
    }

    try {
        const u = await User.build(req.body).save();
        return res.json({ id: u.id });
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            message: 'User creation failed!'
        });
    }
});