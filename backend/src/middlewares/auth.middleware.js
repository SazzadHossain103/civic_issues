import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    console.log("Token:", token);
    if (!token) {
      throw new ApiError("Unauthorized request", 401);
    }
  
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  
    const user = await User.findById(decodedToken?.id).select("-password -refreshToken");
  
    if (!user) {
      throw new ApiError("Invalid Acces Token", 401);
    }
    req.user = user; // Attach user to request object
    next();
  } catch (error) {
    throw new ApiError("Invalid Acces Token", 401);
  }

});