import express from "express";
import cors from "cors";
import testRoute from "./routes/testRoute.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import mediaRoutes from "./routes/mediaRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/test-db", testRoute);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/media", mediaRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});