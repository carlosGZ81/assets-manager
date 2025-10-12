function errorHandler(err, req, res, next) {
    console.error(err); // logging básico
    if (res.headersSent) return next(err);
    res.status(500).json({ message: 'Internal Server Error' });
}


module.exports = { errorHandler };