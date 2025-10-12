require('dotenv').config();
const { app } = require('./app');
const { ensureSchema } = require('./db');
const PORT = process.env.PORT || 3000;


(async () => {
    await ensureSchema();
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
})();