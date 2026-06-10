import { UserRole } from "../../constants/roles";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { Client } from "../clients/client.model"
import { User } from "../user/user.model";

export const getDashboardStatsService =  async (req:AuthRequest)=>{
    const totalClients =  await Client.countDocuments({isActive:true});
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const matchStage: any = {
        isActive: true
      };

      if (
        req.user?.role ===
        UserRole.CLIENT_ADMIN
      ) {
        matchStage.clientId =
          req.user.clientId;
      }
    const roleStats =await User.aggregate([
    {
      $match: matchStage
    },
    {
      $group: {
        _id: "$role",
        count: {
          $sum: 1
        }
      }
    }
  ]);
 const stats = {
    totalClients,
    totalUsers: 0,
    superAdmins: 0,
    clientAdmins: 0,
    managers: 0,
    members: 0
  };

  roleStats.forEach((item) => {

    stats.totalUsers += item.count;

    if (item._id === "SUPER_ADMIN") {
      stats.superAdmins = item.count;
    }

    if (item._id === "CLIENT_ADMIN") {
      stats.clientAdmins = item.count;
    }

    if (item._id === "MANAGER") {
      stats.managers = item.count;
    }

    if (item._id === "MEMBER") {
      stats.members = item.count;
    }
  });

  return stats;
}