const errorHandler = (error, req, res, next) => {
  let status = 500;
  let message = "Internal Server Error";

  if (error.name == "SequelizeValidationError") {
    status = 400;
    message = error.errors[0].message;
  }

  if (error.name === "SequelizeUniqueConstraintError") {
    status = 400;
    message = error.errors[0].message;
  }

  if (error.name == "SequelizeDatabaseError") {
    status = 400;
    message = "Invalid input";
  }

  if (error.name === "EmailError") {
    status = 400;
    message = "Email is required";
  }

  if (error.name === "PasswordError") {
    status = 400;
    message = "Password is required";
  }

  if (error.name === "LoginError") {
    status = 401;
    message = "Invalid Email/Password";
  }

  if (error.name == "Unauthorized") {
    status = 401;
    message = "Invalid token";
  }

  if (error.name == "JsonWebTokenError") {
    status = 401;
    message = "Invalid token";
  }

  if (error.name == "Forbidden") {
    status = 403;
    message = "You're not authorized";
  }

  if (error.name == "ReceiverNotFound") {
    status = 404;
    message = `Data of Receiver not found`;
  }

  if (error.name == "NotFound") {
    status = 404;
    message = `Data not found`;
  }

  res.status(status).json({ message });
};

module.exports = errorHandler;
