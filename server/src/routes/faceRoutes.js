import express from "express";
import upload from "../config/multer.js";
import { protect } from "../middleware/authMiddleware.js";
import { uploadSelfie } from "../controllers/faceController.js";

const router = express.Router();


router.post(
    "/upload-selfie",
    protect,
    upload.single("selfie"),
    uploadSelfie
  );
export default router;