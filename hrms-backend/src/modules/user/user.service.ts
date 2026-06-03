import { UserRole } from "../../constants/roles"
import { AuthRequest } from "../../middlewares/auth.middleware";
import { ApiError } from "../../utils/ApiError";
import { User } from "./user.model";
import bcrypt from 'bcryptjs'

export const createUserService = async (req: AuthRequest) => {
        const data = req.body
        // SUPER_ADMIN rules
        if (req.user?.role === UserRole.SUPER_ADMIN) {
                if (
                        data.role !==
                        UserRole.CLIENT_ADMIN
                ) {
                        throw new ApiError(
                                403,
                                "SUPER_ADMIN can only create CLIENT_ADMIN"
                        );
                }
        }
        // CLIENT_ADMIN rules
        if (
                req.user?.role ===
                UserRole.CLIENT_ADMIN
        ) {
                if (
                        ![
                                UserRole.MANAGER,
                                UserRole.MEMBER,
                        ].includes(data.role)
                ) {
                        throw new ApiError(
                                403,
                                "CLIENT_ADMIN can only create MANAGER or MEMBER"
                        );
                }

                // auto assign clientId
                data.clientId =
                        req.user.clientId;
        }

        // duplicate email check
        const existing =
                await User.findOne({
                        email: data.email,
                });

        if (existing) {
                throw new ApiError(
                        400,
                        "User already exists"
                );
        }

        // hash password
        const hashedPassword =
                await bcrypt.hash(
                        data.password,
                        10
                );

        // create user
        const user = await User.create({
                ...data,
                password: hashedPassword,
        });

        return user;
} 

export const getUsersService = async (
  req: AuthRequest
) => {
  const page =
    Number(req.query.page) || 1;

  const limit =
    Number(req.query.limit) || 10;

  const skip =
    (page - 1) * limit;

  const search =
    req.query.search?.toString() || "";

  const role =
    req.query.role?.toString();

  const filter:
    Record<string, unknown> = {};

  // CLIENT_ADMIN only sees own users
  if (
    req.user?.role ===
    UserRole.CLIENT_ADMIN
  ) {
    filter.clientId =
      req.user.clientId;
  }

  // search
  if (search) {
    filter.$or = [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },
      {
        email: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  // role filter
  if (role) {
    filter.role = role;
  }

  const users =
    await User.find(filter)
      .select("-password")
      .skip(skip)
      .limit(limit)
      .sort({
        createdAt: -1,
      });

  const total =
    await User.countDocuments(
      filter
    );

  return {
    data: users,
    page,
    limit,
    total,
    totalPages: Math.ceil(
      total / limit
    ),
  };
};