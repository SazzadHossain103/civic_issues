import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
import connectDB from "./db/connectDB.js";

import { app } from "./app.js"; // Import the app from app.js
import { createDefaultSuperAdmin } from "./utils/createDefaultSuperAdmin.js";

connectDB()
.then(() => {
  const PORT = process.env.PORT || 5000;
  
  createDefaultSuperAdmin();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
})
.catch((error) => {
    console.error("Failed to connect to the database:", error);
});