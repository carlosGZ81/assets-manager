const { Pool } = require('pg');
require('dotenv').config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });

const pool = new Pool({
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
});


pool.on('error', (err) => console.error('PG Pool error', err));

async function ensureSchema() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS assets (
        id SERIAL PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        type VARCHAR(50),
        owner VARCHAR(120),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
    `);
}

async function truncateAll() {
    await pool.query('TRUNCATE TABLE assets RESTART IDENTITY CASCADE');
}

module.exports = { pool, ensureSchema, truncateAll };