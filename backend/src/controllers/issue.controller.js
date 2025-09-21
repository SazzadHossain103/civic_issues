import { Issue } from "../models/issue.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";

// Create a new issue
export const postIssue = asyncHandler(async (req, res) => {
  const { title, description, images, location, category, priority, postBy } = req.body;
  if (!title || !description || !images || !location || !category) {
    throw new ApiError("All required fields must be provided", 400);
  }
  const issue = await Issue.create({
    title,
    description,
    images,
    location,
    category,
    priority,
    postBy,
  });
  return res.status(201).json(new ApiResponse(201, issue, "Issue posted successfully"));
});

// Update an issue
export const updateIssue = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const issue = await Issue.findByIdAndUpdate(id, updateData, { new: true });
  if (!issue) {
    throw new ApiError("Issue not found", 404);
  }
  return res.status(200).json(new ApiResponse(200, issue, "Issue updated successfully"));
});

// Delete an issue
export const deleteIssue = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const issue = await Issue.findByIdAndDelete(id);
  if (!issue) {
    throw new ApiError("Issue not found", 404);
  }
  return res.status(200).json(new ApiResponse(200, null, "Issue deleted successfully"));
});

// Get all issues (optional, useful for listing)
export const getIssues = asyncHandler(async (req, res) => {
  const issues = await Issue.find().populate("postBy", "fullname email");
  return res.status(200).json(new ApiResponse(200, issues, "Issues fetched successfully"));
});