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
  const issues = await Issue.find()
  .populate('postBy', 'fullname email')
  .populate('comments.commentBy', 'fullname email');
  return res.status(200).json(new ApiResponse(200, issues, "Issues fetched successfully"));
});

// Get a single issue by ID
export const getIssueById = asyncHandler(async (req, res) => {
  // const { id } = req.params;
  const issue = await Issue.findById(req.body.id)
  .populate('postBy', 'fullname email')
  .populate('comments.commentBy', 'fullname email');
  if (!issue) {
    throw new ApiError("Issue not found", 404);
  }
  return res.status(200).json(new ApiResponse(200, issue, "Issue fetched successfully"));
});

// Add a comment to an issue
export const addComment = asyncHandler(async (req, res) => {
  const { issueId, message } = req.body;
  if (!issueId || !message) {
    throw new ApiError("Issue ID and message are required", 400);
  }

  const issue = await Issue.findById(issueId);
  if (!issue) {
    throw new ApiError("Issue not found", 404);
  }

  const onModel = req.user.role === "User" ? "User" : "Admin";

  issue.comments.push({
    message,
    commentBy: req.user._id, // assuming user is logged in via JWT middleware
    onModel,
    isOfficial: onModel === "Admin",
  });

  await issue.save();

  return res
    .status(200)
    .json(new ApiResponse(200, issue, "Comment added successfully"));
});

// Delete a comment
export const deleteComment = asyncHandler(async (req, res) => {
  const { issueId, commentId } = req.body;
  if (!issueId || !commentId) {
    throw new ApiError("Issue ID and comment ID are required", 400);
  }

  const issue = await Issue.findById(issueId);
  if (!issue) {
    throw new ApiError("Issue not found", 404);
  }

  const comment = issue.comments.id(commentId);
  if (!comment) {
    throw new ApiError("Comment not found", 404);
  }

  // Only allow the owner of the comment to delete
  if (comment.commentBy.toString() !== req.user._id.toString()) {
    throw new ApiError("You can only delete your own comments", 403);
  }

  comment.deleteOne();
  await issue.save();

  return res
    .status(200)
    .json(new ApiResponse(200, issue, "Comment deleted successfully"));
});


// Toggle vote for an issue
export const toggleVote = asyncHandler(async (req, res) => {
  const { issueId } = req.body;
  if (!issueId) {
    throw new ApiError("Issue ID is required", 400);
  }

  const issue = await Issue.findById(issueId);
  if (!issue) {
    throw new ApiError("Issue not found", 404);
  }

  const userId = req.user._id;
  const hasVoted = issue.votedBy.includes(userId);

  if (hasVoted) {
    // Remove vote
    issue.votes -= 1;
    issue.votedBy.pull(userId);
  } else {
    // Add vote
    issue.votes += 1;
    issue.votedBy.push(userId);
  }

  await issue.save();

  return res
    .status(200)
    .json(new ApiResponse(200, issue, hasVoted ? "Vote removed" : "Vote added"));
});
