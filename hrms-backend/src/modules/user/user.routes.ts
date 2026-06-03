import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorizeRoles } from "../../middlewares/authorize.middleware";
import { UserRole } from "../../constants/roles";
import { createUser, getUsers } from "./user.controller";

const userRouter = Router();

// userRouter.post("/",authenticate,authorizeRoles("SUPER_ADMIN","CLIENT_ADMIN"))
userRouter.post(
  "/",
  authenticate,
  authorizeRoles(
    UserRole.SUPER_ADMIN,
    UserRole.CLIENT_ADMIN
  ),
  createUser
);

userRouter.get(
  "/",
  authenticate,
  authorizeRoles(
    UserRole.SUPER_ADMIN,
    UserRole.CLIENT_ADMIN
  ),
  getUsers
);


export default userRouter;
