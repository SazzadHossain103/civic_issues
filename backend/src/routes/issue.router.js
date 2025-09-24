import { Router } from "express";
import { upload } from "../middlewares/multer.miiddleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { postIssue, getIssues, getIssueById, updateIssue, deleteIssue } from "../controllers/issue.controller.js";    

const router = Router();

router.route("/add").post( 
    upload.array("images", 5),
    // upload.fields([{ name: 'images', maxCount: 5 }]),
    verifyJWT,
    postIssue);
router.route("/list").get(getIssues);
router.route("/single").post(getIssueById);
router.route("/update").put(updateIssue);
router.route("/delete").post(deleteIssue);

export default router;