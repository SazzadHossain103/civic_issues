import { Router } from "express";
import {
  addAdmin,
  loginAdmin,
  logoutAdmin,
  deleteAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
} from "../controllers/admin.controller.js";
import { verifyAdminJWT, requireSuperAdmin } from "../middlewares/adminAuth.middleware.js";

const router = Router();

// Auth routes
router.post("/login", loginAdmin);
router.post("/logout", verifyAdminJWT, logoutAdmin);

// Super Admin only routes
router.post("/add", verifyAdminJWT, requireSuperAdmin, addAdmin);
router.delete("/delete", verifyAdminJWT, requireSuperAdmin, deleteAdmin);
router.get("/list", verifyAdminJWT, getAllAdmins);
router.put("/update", verifyAdminJWT, requireSuperAdmin, updateAdmin);

// Super Admin can view anyone, others can view themselves
router.get("/:id", verifyAdminJWT, getAdminById);

export default router;
