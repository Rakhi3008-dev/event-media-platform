import express from "express";
import upload from "../config/multer.js";
import { protect } from "../middleware/authMiddleware.js";
import { DetectFacesCommand } from "@aws-sdk/client-rekognition";
import rekognition from "../config/rekognition.js";
  import {
    uploadSelfie,
    getMySelfie,
    getMyMatches
  } from "../controllers/faceController.js";
const router = express.Router();


router.post(
    "/upload-selfie",
    protect,
    upload.single("selfie"),
    uploadSelfie
  );
  router.get(
    "/my-selfie",
    protect,
    getMySelfie
  );
  router.get(
    "/matches",
    protect,
    getMyMatches
  );
  router.get("/test-face", async (req, res) => {
    try {
      const command = new DetectFacesCommand({
        Image: {
          Bytes: Buffer.from("test"),
        },
      });
  
      await rekognition.send(command);
  
      res.json({
        success: true,
      });
  
    } catch (err) {
      res.json({
        message: err.message,
      });
    }
  });
export default router;