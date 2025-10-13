
const path = require('path');
const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorHandler');
const assetsRouter = require('./routes/assets.routes');

const { authRequired } = require('./middleware/auth');
const authRouter = require('./routes/auth.routes');

const app = express();

app.use(cors());
app.use(express.json());
// assets
app.use('/api/assets', assetsRouter);
// Auth
app.use('/api/auth', authRouter);
app.use('/api/assets', authRequired, assetsRouter);

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use((req, res, next) => {
    if (req.path.startsWith('/api/')) return res.status(404).json({ message: 'Not Found' });
    next();
});
app.use(errorHandler);


module.exports = { app };