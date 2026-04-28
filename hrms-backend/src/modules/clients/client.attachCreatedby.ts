import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";

export const attachCreatedBy = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  console.log("USER IN MIDDLEWARE:", req.user);  

  req.body.createdBy = req.user?.id;  

  next();
};