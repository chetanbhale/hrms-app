import { Response, NextFunction } from "express";
import {
  createUserService,
  getUsersService,
} from "./user.service";

import { AuthRequest } from "../../middlewares/auth.middleware";


// CREATE USER
export const createUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await createUserService(req);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};


// GET USERS
export const getUsers = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getUsersService(req);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};