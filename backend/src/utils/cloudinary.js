import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (filePath) => {
  try {
    if(!filePath) return null; // Check if filePath is provided
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto" // Automatically detect the resource type (image, video, etc.)
    });
    // console.log("File uploaded successfully:", result.secure_url);
    fs.unlinkSync(filePath);
    return result.secure_url; // Return the secure URL of the uploaded file
  } catch (error) {
    fs.unlinkSync(filePath); // Remove the file from local storage after upload
    // console.error("Error uploading to Cloudinary:", error);
    // throw error; // Propagate the error for further handling
    return null; // Return null if upload fails
  }
}

export default uploadOnCloudinary;