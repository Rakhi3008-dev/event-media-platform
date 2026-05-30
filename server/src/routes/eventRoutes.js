import express from "express";
import { createEvent, getEvents } from "../controllers/eventController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, createEvent);
router.get("/", getEvents);

router.post(
  "/",
  protect,
  authorize("admin", "organizer"),
  createEvent
);

export default router;