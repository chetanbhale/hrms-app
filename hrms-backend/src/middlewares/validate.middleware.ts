import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

export const validate =
  (schema: ZodSchema<unknown>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const message = error.issues
          .map((issue) => issue.message)
          .join(", ");

        return res.status(400).json({
          success: false,
          message,
        });
      }

      next(error);
    }
  };