import mongoose from "mongoose";
import { MONGO_URL, DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    await mongoose.connect(`${MONGO_URL}/${DB_NAME}`);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1); // Exit the process with failure
  }
}
export default connectDB;