const { pool } = require('../db');
const { validateAssetPayload } = require('../validators/assets.validator');

async function listAssets(req, res, next) {
    try {
        const { rows } = await pool.query(
            'SELECT id, name, type, owner, created_at FROM assets ORDER BY id ASC'
        );
        res.json(rows);
    } catch (err) {
        next(err);
    }
}

async function getAsset(req, res, next) {
    try {
        const { id } = req.params;
        const { rows } = await pool.query(
            'SELECT id, name, type, owner, created_at FROM assets WHERE id = $1',
            [id]
        );
        if (rows.length === 0) return res.status(404).json({ message: 'Asset not found' });
        res.json(rows[0]);
    } catch (err) {
        next(err);
    }
}


async function createAsset(req, res, next) {
    try {
        const errors = validateAssetPayload(req.body);
        if (errors.length) return res.status(400).json({ errors });


        const { name, type, owner } = req.body;
        const { rows } = await pool.query(
            'INSERT INTO assets (name, type, owner) VALUES ($1, $2, $3) RETURNING id, name, type, owner, created_at',
            [name.trim(), type || null, owner || null]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        next(err);
    }
}


async function updateAsset(req, res, next) {
    try {
        const { id } = req.params;
        const errors = validateAssetPayload(req.body);
        if (errors.length) return res.status(400).json({ errors });


        const { name, type, owner } = req.body;
        const { rows } = await pool.query(
            `UPDATE assets
            SET name = $1, type = $2, owner = $3
            WHERE id = $4
            RETURNING id, name, type, owner, created_at`,
            [name.trim(), type || null, owner || null, id]
        );
        if (rows.length === 0) return res.status(404).json({ message: 'Asset not found' });
        res.json(rows[0]);
    } catch (err) {
        next(err);
    }
}


async function deleteAsset(req, res, next) {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM assets WHERE id = $1', [id]);
        if (result.rowCount === 0) return res.status(404).json({ message: 'Asset not found' });
        res.status(204).send();
    } catch (err) {
        next(err);
    }
}


module.exports = { listAssets, getAsset, createAsset, updateAsset, deleteAsset };