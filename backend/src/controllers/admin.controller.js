import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";

// Generate JWT
const generateToken = (adminId) => {
  return jwt.sign({ id: adminId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Add new Admin (only Super Admin can do this)
export const addAdmin = asyncHandler(async (req, res) => {
  const { fullname, email, role, status, department, permissions, password } = req.body;

  if (!fullname || !email || !role || !department || !password) {
    throw new ApiError("All fields are required", 400);
  }

  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    throw new ApiError("Admin with this email already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await Admin.create({
    fullname,
    email,
    role,
    status,
    department,
    permissions,
    password: hashedPassword,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, admin, "Admin created successfully"));
});

// Login Admin
export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError("Email and password are required", 400);
  }

  const admin = await Admin.findOne({ email });
  if (!admin) {
    throw new ApiError("Invalid credentials", 401);
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    throw new ApiError("Invalid credentials", 401);
  }

  const token = generateToken(admin._id);

  const options = {
    httpOnly: true,
    secure: true, // Set to true if using HTTPS
  };

  return res
    .cookie("token", token, options)
    .status(200)
    .json(new ApiResponse(200, { token, admin }, "Login successful"));
});

// Logout Admin (frontend should just delete token, but we can blacklist if needed)
export const logoutAdmin = asyncHandler(async (req, res) => {
  // For JWT stateless, we just tell frontend to clear token
  const options = {
    httpOnly: true,
    secure: true, // Set to true if using HTTPS
  };
  return res
    .clearCookie("token", options)
    .status(200)
    .json(new ApiResponse(200, null, "Logout successful. Clear token client-side."));
});

// Delete Admin (only Super Admin can do this)
export const deleteAdmin = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    throw new ApiError("Admin ID required", 400);
  }

  const admin = await Admin.findByIdAndDelete(id);
  if (!admin) {
    throw new ApiError("Admin not found", 404);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Admin deleted successfully"));
});

// Get all admins 
export const getAllAdmins = asyncHandler(async (req, res) => {
  const admins = await Admin.find().select("-password"); // exclude password
  return res
    .status(200)
    .json(new ApiResponse(200, admins, "Admins fetched successfully"));
});

// Get single admin by ID (Super Admin only, or self-view)
export const getAdminById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError("Admin ID is required", 400);
  }

  const admin = await Admin.findById(id).select("-password");
  if (!admin) {
    throw new ApiError("Admin not found", 404);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, admin, "Admin fetched successfully"));
});

// Update Admin (Super Admin only)
export const updateAdmin = asyncHandler(async (req, res) => {
  const { id } = req.body; // expecting id + fields to update

  if (!id) {
    throw new ApiError("Admin ID is required", 400);
  }

  const updateData = { ...req.body };
  delete updateData.password; // don't allow password update here

  const admin = await Admin.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).select("-password");

  if (!admin) {
    throw new ApiError("Admin not found", 404);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, admin, "Admin updated successfully"));
});