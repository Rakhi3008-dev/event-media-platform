import express from "express";
import upload from "../config/multer.js";
import { protect } from "../middleware/authMiddleware.js";
import {
    uploadMedia,
    getEventMedia,
    deleteMedia
  } from "../controllers/mediaController.js";
  import { downloadMedia } from "../controllers/mediaController.js";
  
const router = express.Router();

router.post(
  "/upload",
  protect,
  upload.single("file"),
  uploadMedia
);
router.get(
    "/event/:eventId",
    getEventMedia
  );
  router.delete(
    "/:id",
    protect,
    deleteMedia
  );

  router.get("/download/:id", downloadMedia);

export default router;