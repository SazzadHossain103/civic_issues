import bcrypt from "bcrypt";
import { Admin } from "../models/admin.model.js";

export const createDefaultSuperAdmin = async () => {
  try {
    const existingSuperAdmin = await Admin.findOne({ $or: [{ email: process.env.SUPER_ADMIN_EMAIL}] });

    if (!existingSuperAdmin) {
      const hashedPassword = await bcrypt.hash(process.env.SUPER_ADMIN_PASSWORD , 10);

      await Admin.create({
        fullname: process.env.SUPER_ADMIN_NAME ,
        email: process.env.SUPER_ADMIN_EMAIL ,
        role: "Super Admin",
        department: "Central Administration",
        permissions: ["all"], // give full permissions
        password: hashedPassword,
      });

      console.log("Default Super Admin created successfully!");
    } else {
      console.log("Super Admin already exists. Skipping creation.");
    }
  } catch (error) {
    console.log("Error creating default Super Admin:", error.message);
  }
};
