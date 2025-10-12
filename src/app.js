
const path = require('path');
const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorHandler');
const assetsRouter = require('./routes/assets.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/assets', assetsRouter);
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use((req, res, next) => {
    if (req.path.startsWith('/api/')) return res.status(404).json({ message: 'Not Found' });
    next();
});
app.use(errorHandler);


module.exports = { app };