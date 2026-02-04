const errorMiddleware = (err, req, res, next) => {
  try {
    const error = { ...err };
    error.message = err.message;

    if (err.name === "CastError") {
      error.statusCode = 400;
      error.message = `Resource not found with id of ${err.value}`;
    }
    if (err.name == "")
      if (err.name === "ValidationError") {
        console.log(Object.values(err.errors));
        const messages = Object.values(err.errors).map((val) => val.message);
        error.statusCode = 400;
        error.message = messages.join(", ");
      }

    if (err.code && err.code === 11000) {
      error.statusCode = 400;
      error.message = `Duplicate field value entered: ${JSON.stringify(err.keyValue)}`;
    }

    if (err.name === "JsonWebTokenError") {
      error.statusCode = 401;
      error.message = "Invalid token. Please log in again.";
    }

    if (err.name === "TokenExpiredError") {
      error.statusCode = 401;
      error.message = "Your token has expired. Please log in again.";
    }
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Server Error",
    });
  } catch (error) {
    next(error);
  }
};
export default errorMiddleware;
