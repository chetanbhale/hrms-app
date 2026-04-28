import { RequestHandler } from "express";
import { registerService, loginService } from "./auth.service";

export const register: RequestHandler =  
  async (req, res) => {
    const user = await registerService(req.body);

    res.status(201).json({
      success: true,
      data: user,
    });
  }


export const login: RequestHandler = (
  async (req, res) => {
    const { email, password } = req.body;

    const result = await loginService(email, password);

    res.status(200).json({
      success: true,
      data: result,
    });
  }
);