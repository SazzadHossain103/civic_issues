import { Issue } from "../models/issue.model.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiResponse} from "../utils/apiResponse.js";
import {ApiError} from "../utils/apiError.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

// Create a new issue
export const postIssue = asyncHandler(async (req, res) => {
  const { title, description, location, category, priority, postBy } = req.body;
  // const images = req.files ? req.files['images']?.map(file => file.path) : [];
  const images = req.files ? req.files.map(file => file.path) : [];
  console.log(req.body, req.files);
  console.log(images);
  if (!title || !description || !images?.length || !location || !category) {
    throw new ApiError("All required fields must be provided", 400);
  }
  if (images.length > 5) {
    throw new ApiError("Maximum 5 images are allowed", 400);
  }
  
  // Upload images to Cloudinary
  const uploadedImageUrls = [];
  for (const imagePath of images) {
    const imageUrl = await uploadOnCloudinary(imagePath);
    if (imageUrl) {
      uploadedImageUrls.push(imageUrl);
    } else {  
      throw new ApiError("Failed to upload one of the images", 500);
    }
  }

  // Create issue entry in the database

  const issue = await Issue.create({
    title,
    description,
    images : uploadedImageUrls,
    location,
    category,
    priority,
    postBy: req.user._id, // Assuming req.user is populated by verifyJWT middleware
  });
  return res.status(201).json(new ApiResponse(201, issue, "Issue posted successfully"));
});

// Update an issue
export const updateIssue = asyncHandler(async (req, res) => {
  // const { id } = req.params;
  const updateData = req.body;
  const issue = await Issue.findByIdAndUpdate(req.body.id, updateData, { new: true });
  if (!issue) {
    throw new ApiError("Issue not found", 404);
  }
  return res.status(200).json(new ApiResponse(200, issue, "Issue updated successfully"));
});

// Delete an issue
export const deleteIssue = asyncHandler(async (req, res) => {
  // const { id } = req.params;
  const issue = await Issue.findByIdAndDelete(req.body.id);
  if (!issue) {
    throw new ApiError("Issue not found", 404);
  }
  return res.status(200).json(new ApiResponse(200, null, "Issue deleted successfully"));
});

// Get all issues (optional, useful for listing)
export const getIssues = asyncHandler(async (req, res) => {
  const issues = await Issue.find();
  return res.status(200).json(new ApiResponse(200, issues, "Issues fetched successfully"));
});

// Get a single issue by ID
export const getIssueById = asyncHandler(async (req, res) => {
  // const { id } = req.params;
  const issue = await Issue.findById(req.body.id);
  if (!issue) {
    throw new ApiError("Issue not found", 404);
  }
  return res.status(200).json(new ApiResponse(200, issue, "Issue fetched successfully"));
});