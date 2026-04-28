import { Router } from "express";
import { createClient, deleteClient, getAllClients, getClientByID, updateClientById } from "./client.controller";
import { validate } from "../../middlewares/validate.middleware";
import { createClientSchema, updateClientSchema } from "./client.validation";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorizeRoles } from "../../middlewares/authorize.middleware";
import { attachCreatedBy } from "./client.attachCreatedby";

const clientRouter = Router();

// CREATE → only SUPER_ADMIN
clientRouter.post(
  "/",
  authenticate,
  attachCreatedBy,
  authorizeRoles("SUPER_ADMIN"),
  validate(createClientSchema),
  createClient
);

// GET → allow multiple roles
clientRouter.get(
  "/",
  authenticate,
  authorizeRoles("SUPER_ADMIN", "CLIENT_ADMIN"),
  getAllClients
);

clientRouter.get(
  "/:id",
  authenticate,
  authorizeRoles("SUPER_ADMIN", "CLIENT_ADMIN"),
  getClientByID
);

// UPDATE → only SUPER_ADMIN
clientRouter.put(
  "/:id",
  authenticate,
  authorizeRoles("SUPER_ADMIN"),
  validate(updateClientSchema),
  updateClientById
);

// DELETE → only SUPER_ADMIN
clientRouter.delete(
  "/:id",
  authenticate,
  authorizeRoles("SUPER_ADMIN"),
  deleteClient
);
export default clientRouter