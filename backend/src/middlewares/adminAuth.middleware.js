import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyAdminJWT = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    throw new ApiError("Unauthorized: No token provided", 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      throw new ApiError("Admin not found", 404);
    }

    req.user = admin; // attach admin info
    next();
  } catch (error) {
    throw new ApiError("Unauthorized: Invalid token", 401);
  }
});

export const requireSuperAdmin = (req, res, next) => {
  if (req.user.role !== "Super Admin") {
    throw new ApiError("Forbidden: Super Admin access only", 403);
  }
  next();
};
