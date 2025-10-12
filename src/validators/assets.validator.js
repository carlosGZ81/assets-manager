function validateAssetPayload(body) {
    const errors = [];
    if (!body || typeof body !== 'object') {
        errors.push('Invalid body');
        return errors;
    }
    if (!body.name || String(body.name).trim() === '') {
        errors.push('"name" is required');
    }
    // Opcional: normalizar strings
    if (body.type && typeof body.type !== 'string') errors.push('"type" must be a string');
    if (body.owner && typeof body.owner !== 'string') errors.push('"owner" must be a string');
    return errors;
}


module.exports = { validateAssetPayload };