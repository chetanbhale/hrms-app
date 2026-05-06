import { Request, Response } from "express";
import { AppError } from "../types/error.types";

export const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response
) => {
  console.error("🔥 Error:", err.message);

  let statusCode = 500;
  let message = "Internal Server Error";

  // Mongoose validation error
  if (err.name === "ValidationError" && err.errors) {
    statusCode = 400;

    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  // Duplicate key
  if (err.code === 11000) {
    statusCode = 400;
    message = "Duplicate field value entered";
  }

  // Custom API error
  if (err.statusCode) {
    statusCode = err.statusCode;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};