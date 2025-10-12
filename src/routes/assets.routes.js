const express = require('express');
const ctrl = require('../controllers/assets.controller');
const router = express.Router();

//api/assets
router.get('/', ctrl.listAssets);
router.get('/:id', ctrl.getAsset);
router.post('/', ctrl.createAsset);
router.put('/:id', ctrl.updateAsset);
router.delete('/:id', ctrl.deleteAsset);

module.exports = router;