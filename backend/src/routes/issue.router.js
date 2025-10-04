import { Router } from "express";
import { upload } from "../middlewares/multer.miiddleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdminJWT } from "../middlewares/adminAuth.middleware.js";
import { postIssue, getIssues, getIssueById, updateIssue, deleteIssue, addComment,deleteComment, toggleVote } from "../controllers/issue.controller.js";    

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
router.route("/comment").post(verifyJWT, addComment);
router.route("/commentadmin").post(verifyAdminJWT, addComment);
router.route("/comment").delete(verifyJWT, deleteComment);
router.route("/vote").post(verifyJWT, toggleVote);

export default router;