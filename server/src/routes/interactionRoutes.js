import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  likeMedia,
  addComment,
  getComments,
} from "../controllers/interactionController.js";

const router = express.Router();

router.post("/like/:mediaId", protect, likeMedia);
router.post("/comment/:mediaId", protect, addComment);
router.get("/comment/:mediaId", getComments);

export default router;