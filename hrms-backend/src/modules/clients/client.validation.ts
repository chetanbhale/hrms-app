import { z } from "zod";

export const createClientSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  companyEmail: z
    .string()
    .email("Invalid email format"),
  phone: z.string().optional(),
  address: z.string().optional(),
  subscriptionPlan: z
    .enum(["FREE", "PRO", "ENTERPRISE"])
    .optional(),
  createdBy: z.string().min(1, "createdBy is required"),
});

export const updateClientSchema = z.object({
  companyName: z.string().optional(),
  companyEmail: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  subscriptionPlan: z.enum(["FREE", "PRO", "ENTERPRISE"]).optional(),
});