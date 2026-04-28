import { Schema, model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "SUPER_ADMIN" | "CLIENT_ADMIN" | "MANAGER" | "MEMBER";
  clientId?: string;
  isActive: boolean;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
        type: String,
        required: true,
        select: false,
    },

    role: {
      type: String,
      enum: ["SUPER_ADMIN", "CLIENT_ADMIN", "MANAGER", "MEMBER"],
      required: true,
    },

    clientId: {
      type: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", userSchema);