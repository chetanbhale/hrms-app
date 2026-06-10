import { Response, NextFunction, RequestHandler } from "express";
import {
  createUserService,
  deleteUserService,
  getuserByIdService,
  getUsersService,
  updateUserService,
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

export const getUserByID:RequestHandler = async(req,res)=>{
   const userId = String(req.params.id)
   const user  = await getuserByIdService(userId);
   res.status(200).json({success:true, data:user})
}


export const updateUser:RequestHandler = async (req,res) => {
 
    console.log("ID:", req.params.id);
    console.log("BODY:", req.body);

    const userID = String(req.params.id);

    const updated = await updateUserService(
      userID,
      req.body
    );

    res.status(200).json({
      success: true,
      data: updated
    });

};

export const deleteUser: RequestHandler = 
  async (req, res) => {
   const id = String(req.params.id)
    await deleteUserService(id);

    res.status(200).json({
      success: true,
      message: "User deactivated successfully",
    });
  }