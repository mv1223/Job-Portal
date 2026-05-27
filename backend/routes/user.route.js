import express from "express";
import { login, logout, register, updateProfile, analyzeResume, getJobMatches, exportUsers } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";
 
const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);
router.route("/analyze-resume").post(isAuthenticated, singleUpload, analyzeResume);
router.route("/job-matches").get(isAuthenticated, getJobMatches);
router.route("/export").get(isAuthenticated, exportUsers);

export default router;

