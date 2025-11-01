import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import User from "../models/user.model.js";
import { Issue } from "../models/issue.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res

  // Registration logic here
  // res.status(200).json({ message: "User registered successfully" });
  console.log("Request body:", req.body);
  console.log("headers:", req.headers);
  if (!req.body) {
    throw new ApiError("Request body is missing", 400);
  }
  const { fullname, email, password } = req.body;
  console.log("User registration details:", { fullname, email, password });

  if (["fullname", "email", "password"].some(field => field?.trim() === "")) {
    throw new ApiError("All fields are required", 400);
  }

  const existingUser = await User.findOne({ $or: [{ email }] });
  if (existingUser) {
    throw new ApiError("Username or email already exists", 409);
  }

  // const avatarLocalPath = req.files?.avatar?.[0]?.path;

  // console.log("Avatar local path:", avatarLocalPath);
  // const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  // let coverImageLocalPath;
  // if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
  //   coverImageLocalPath = req.files.coverImage[0].path
  // }

  // if (!avatarLocalPath) {
  //   throw new ApiError("Avatar are required", 400);
  // }

  // const avatarUrl = await uploadOnCloudinary(avatarLocalPath);
  // const coverImageUrl = coverImageLocalPath ? await uploadOnCloudinary(coverImageLocalPath) : "";

  // if (!avatarUrl) {
  //   throw new ApiError("Failed to upload avatar", 400);
  // }

  const user = await User.create({
    fullname,
    // username: username.toLowerCase(),
    email,
    password,
    // avatar: avatarUrl,
    // coverImage: coverImageUrl ? coverImageUrl : ""
  });

  const createdUser = await User.findById(user._id)
    .select("-password -refreshToken")

  if (!createdUser) {
    throw new ApiError("User creation failed", 500);
  }

  return res.status(201).json(new ApiResponse(200, createdUser, "User registered successfully"));

})

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    console.log("Generating tokens for user:", user);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError("Failed to generate tokens", 500);
  }
}

const loginUser = asyncHandler(async (req, res) => {
  // Login logic here
  const { email, password } = req.body;
  if (!email) {
    throw new ApiError("email are required", 400);
  }

  const user = await User.findOne({ $or: [{ email }] });
  if (!user) {
    throw new ApiError("User not found", 404);
  }

  const isPasswordValid = await user.isPasswordMatch(password);
  if (!isPasswordValid) {
    throw new ApiError("Invalid password", 401);
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

  const loggedInUser = await User.findById(user._id)
    .select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: true, // Set to true if using HTTPS
  };

  return res
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .status(200)
    .json(new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User logged in successfully"));

});

const logoutUser = asyncHandler(async (req, res) => {
  User.findByIdAndUpdate(req.user._id, { $set: { refreshToken: undefined } }, { new: true })

  const options = {
    httpOnly: true,
    secure: true, // Set to true if using HTTPS
  };

  return res
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .status(200)
    .json(new ApiResponse(200, null, "User logged out successfully"));

});

export { registerUser, loginUser, logoutUser };

// Get all users 
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password -refreshToken"); // exclude password
  return res
    .status(200)
    .json(new ApiResponse(200, users, "users fetched successfully"));
});

// Delete a user
// export const deleteUser = asyncHandler(async (req, res) => {
//   // const { id } = req.params;
//   const user = await User.findByIdAndDelete(req.body.id);
//   if (!user) {
//     throw new ApiError("User not found", 404);
//   }
//   return res.status(200).json(new ApiResponse(200, null, "User deleted successfully"));
// });

export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new ApiError("User not found", 404);
  }

  // 1️⃣ Delete all issues posted by the user
  await Issue.deleteMany({ postBy: id });

  // 2️⃣ Remove all comments made by the user
  await Issue.updateMany(
    {},
    { $pull: { comments: { commentBy: id } } }
  );

  // 3️⃣ Remove user's votes and adjust the vote count
  const votedIssues = await Issue.find({ votedBy: id });
  for (const issue of votedIssues) {
    issue.votedBy.pull(id);
    issue.votes = Math.max(0, issue.votes - 1);
    await issue.save();
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "User and related data deleted successfully"));
});

// Update user password
export const updateUserPassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword, id } = req.body;
  const user = await User.findById(id);
  // console.log("Request to update password for user ID:", req.user._id);
  // console.log("Updating password for user ID:", id);
  // console.log("Current Password:", currentPassword);
  // console.log("New Password:", newPassword);
  if (!user) {
    throw new ApiError("User not found", 404);
  }
  const isPasswordValid = await user.isPasswordMatch(currentPassword);
  if (!isPasswordValid) {
    throw new ApiError("Current password is incorrect", 401);
  }
  user.password = newPassword;
  await user.save();
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Password updated successfully"));
});

// update user profile
export const updateUserProfile = asyncHandler(async (req, res) => {
  const { fullname, email, id } = req.body;
  const user = await User.findById(id);

  if (!user) {
    throw new ApiError("User not found", 404);
  }
  user.fullname = fullname || user.fullname;
  user.email = email || user.email;
  await user.save();
  const updatedUser = await User.findById(req.user._id).select("-password -refreshToken");
  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "Profile updated successfully"));
});