import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorizeRoles } from "../../middlewares/authorize.middleware";
import { UserRole } from "../../constants/roles";
import dasboardStats from "./dashboard-stats.contoller";

const dashboardStatsRouter = Router();

dashboardStatsRouter.get('/stats',authenticate,authorizeRoles(UserRole.SUPER_ADMIN,UserRole.CLIENT_ADMIN),dasboardStats);

export default dashboardStatsRouter;