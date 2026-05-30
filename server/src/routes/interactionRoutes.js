import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
    likeMedia,
    addComment,
    getComments,
    getLikes
  } from "../controllers/interactionController.js";
const router = express.Router();

router.post("/like/:mediaId", protect, likeMedia);
router.post("/comment/:mediaId", protect, addComment);
router.get("/comment/:mediaId", getComments);
router.get("/likes/:mediaId", getLikes);

export default router;