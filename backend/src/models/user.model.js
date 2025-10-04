import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
  // username: { type: String, required: true, unique: true, trim: true, lowercase: true, index: true },
  fullname: { type: String, required: true, trim: true, index: true  },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true},
  // avatar: { 
  //   type: String, // cloudinary URL
  //   required: true },
  // coverImage: {
  //   type: String, // cloudinary URL
  // },
  // watchHistory: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Issue",
  // }],
  password: { type: String, required: [true, 'password is  required'] },
  role: { 
    type: String, 
    default: "User",
  },
  refreshToken: { type: String }
},{ timestamps: true });

userSchema.pre("save", async function(next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.isPasswordMatch = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// userSchema.methods.isPasswordCorrect = async function(enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

userSchema.methods.generateAccessToken = function() {
  return jwt.sign(
    { id: this._id, 
      email: this.email, 
      // username: this.username, 
      fullname: this.fullname  
    }, 
    process.env.JWT_SECRET, 
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" });
}

userSchema.methods.generateRefreshToken = function() {
  return jwt.sign(
    { id: this._id, }, 
    process.env.JWT_REFRESH_SECRET, 
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d" });
}

const User = mongoose.model("User", userSchema);
export default User;