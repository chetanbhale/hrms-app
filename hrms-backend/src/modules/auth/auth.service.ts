import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../user/user.model";
import { ApiError } from "../../utils/ApiError";
import { config } from "../../config/env";

export const registerService = async (data: any) => {
  const existing = await User.findOne({ email: data.email });

  if (existing) {
    throw new ApiError(400, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await User.create({
    ...data,
    password: hashedPassword,
  });

  return user;
};



export const loginService = async (email: string, password: string) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(400, "Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new ApiError(400, "Invalid credentials");
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
      clientId: user.clientId,
    },
    config.jwtSecret,
    { expiresIn: "1d" }
  );

  const { password: userPassword, ...userWithoutPassword } =
    user.toObject();

  return { user: userWithoutPassword, token };
};