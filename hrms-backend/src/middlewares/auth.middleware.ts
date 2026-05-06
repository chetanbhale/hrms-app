import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/env";
import { ApiError } from "../utils/ApiError";
import { JwtPayload } from "../types/auth.types";

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ApiError(401, "Unauthorized - No token provided"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;

    req.user = decoded; // attach user info
    next();
  } catch (error) {
    console.log(error)
    return next(new ApiError(401, "Unauthorized - Invalid token"));
  }
};