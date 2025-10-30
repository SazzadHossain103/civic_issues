import mongoose from "mongoose";
const issueSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: [{
    type: String, // cloudinary URL
    required: true
  }],
  location: { type: String, required: true },
  category: { type: String, required: true },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High", "Critical"],
    default: "Low"
  },
  status: {
    type: String,
    enum: ["Pending", "In-progress", "Resolved"],
    default: "Pending"
  },
  votes: { type: Number, default: 0 },
  votedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  postDate: { type: Date, default: Date.now },
  postBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comments: [{
    message: String,
    commentBy: {
      type: mongoose.Schema.Types.ObjectId,
      // ref: "User",
      refPath: "comments.onModel",
    },
    onModel: {
      type: String,
      enum: ["User", "Admin"],
    },
    isOfficial: { type: Boolean, default: false },
    commentAt: { type: Date, default: Date.now },
  }],
}, { timestamps: true });
export const Issue = mongoose.model("Issue", issueSchema);