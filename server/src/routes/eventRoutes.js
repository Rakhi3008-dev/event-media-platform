import express from "express";
import { createEvent, getEvents } from "../controllers/eventController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import upload from "../config/multer.js";

const router = express.Router();

router.post("/", protect, createEvent);
router.get("/", getEvents);

router.post(
    "/",
    protect,
    authorize("admin", "organizer"),
    upload.single("coverImage"),
    createEvent
  );

export default router;