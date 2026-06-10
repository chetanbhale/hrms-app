import { RequestHandler } from "express";
import { getDashboardStatsService } from "./dashboard-stats.service";


const dasboardStats:RequestHandler = async (req,res)=>{
try {
  const stats =
    await getDashboardStatsService(req);

  res.status(200).json({
    success: true,
    data: stats
  });

} catch (error) {

  console.log(
    "DASHBOARD ERROR:",
    error
  );

  throw error;
}
}

export default dasboardStats