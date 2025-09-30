import { Router } from "express";
import { registerUser, loginUser, logoutUser, getAllUsers } from "../controllers/user.contorller.js";
import { upload } from "../middlewares/multer.miiddleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  // upload.fields([
  //   { name: "avatar", maxCount: 1 },
  //   { name: "coverImage", maxCount: 1 }
  // ]),
  upload.none(),
  registerUser);

router.route("/login").post(loginUser);
router.route("/list").get(getAllUsers);
router.route("/logout").post(verifyJWT, logoutUser);

export default router;