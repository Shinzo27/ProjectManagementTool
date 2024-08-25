export class ErrorHandler extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
}
  
  export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;
  
    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    }
    if (err.name === "JsonWebTokenError") {
      const message = `Json Web Token is invalid, Try again!`;
      err = new ErrorHandler(message, 400);
    }
    if (err.name === "TokenExpiredError") {
      const message = `Json Web Token is expired, Try again!`;
      err = new ErrorHandler(message, 400);
    }
    if (err.name === "CastError") {
      const message = `Invalid ${err.path}`,
        err = new ErrorHandler(message, 400);
    }
  
    const errorMessage = err.erros ? Object.values(err.erros).map((error)=> error.message) : err.message
  
    return res.status(err.statusCode).json({
      success: false,
      message: errorMessage
    })
  }
  
  export default ErrorHandler