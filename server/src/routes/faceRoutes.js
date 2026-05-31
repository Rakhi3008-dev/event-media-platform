import express from "express";

const router = express.Router();

router.post("/upload-selfie", (req, res) => {
  res.json({
    success: true,
    message: "Selfie route working",
  });
});

export default router;