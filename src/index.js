const path = require('path');
const express = require('express');
const cors = require('cors');
require('dotenv').config();


const assetsRouter = require('./routes/assets.routes');
const { errorHandler } = require('./middleware/errorHandler');


const app = express();
const PORT = process.env.PORT || 3000;


// Middlewares
app.use(cors()); // si servís el frontend estático desde /public, CORS no es estrictamente necesario
app.use(express.json());


// API
app.use('/api/assets', assetsRouter);


// Frontend estático
app.use(express.static(path.join(__dirname, '..', 'public')));


// 404 para rutas no encontradas
app.use((req, res, next) => {
    if (req.path.startsWith('/api/')) return res.status(404).json({ message: 'Not Found' });
    next();
});


// Error handler
app.use(errorHandler);


app.get('/api/health', async (req, res) => {
    try {
        const { pool } = require('./db');
        await pool.query('SELECT 1');
        res.json({ ok: true });
    } catch (e) {
        res.status(500).json({ ok: false, error: e.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});