const express = require('express');
const { signToken } = require('../middleware/auth');
const router = express.Router();


router.post('/login', (req, res) => {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ message: 'email y password son requeridos' });


    // Credenciales fijas desde .env para el challenge
    if (email === process.env.AUTH_EMAIL && password === process.env.AUTH_PASSWORD) {
        const token = signToken({ sub: email });
        return res.json({ token });
    }
    return res.status(401).json({ message: 'Credenciales inválidas' });
});


router.get('/profile', (req, res) => {
    // endpoint opcional para validar token desde FE
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    const jwt = require('jsonwebtoken');
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ ok: true, user: { email: data.sub } });
    } catch (e) {
        res.status(401).json({ message: 'Invalid token' });
    }
});


module.exports = router;