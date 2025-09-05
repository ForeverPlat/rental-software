const errorHandler = (error, req, res, next) => {

    const statusCode = error.statusCode || error.status || 500;
    const message = error.message || 'Server error';

    res.status(statusCode).json({ message });
}

export default errorHandler;