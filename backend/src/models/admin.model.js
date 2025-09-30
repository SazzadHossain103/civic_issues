import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, minlength: 6, required: [true, 'password is  required'] },
  role: {
    type: String,
    enum: ["Super Admin", "Regional Admin", "Department Admin", "Moderator"],
    required: true,
  },

  department: {
    type: String,
    required: true,
    trim: true,
  },

  permissions: [
    {
      type: String,
      trim: true,
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
  
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export const Admin = mongoose.model("Admin", adminSchema);
