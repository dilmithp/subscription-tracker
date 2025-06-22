const errorMiddleware = (err, req, res, next) => {
    try {
        let error = { ...err };
        error.message = err.message;
        console.error('Error caught by middleware:', err);

        // Mongoose errors...
        if (err.name === "CastError") {
            error = new Error(`Resource not found. Invalid: ${err.path}`);
            error.statusCode = 404;
        }
        if (err.code === 11000) {
            error = new Error('Duplicate field value entered');
            error.statusCode = 400;
        }
        if (err.name === "ValidationError") {
            const message = Object.values(err.errors).map(val => val.message).join(', ');
            error = new Error(message);
            error.statusCode = 400;
        }
        res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || "Server Error",
            status: error.statusCode || 500
        });
    } catch (e) {
        next(e);
    }
};
export default errorMiddleware;
