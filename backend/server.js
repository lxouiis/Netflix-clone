import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import Subscription from "./Models/Subscription.js"; // keep Models if your folder is Models

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());
// ✅ Health check routes
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

app.get("/health", (req, res) => {
  res.json({ ok: true, message: "Backend running" });
});

// ✅ Subscribe route (writes to MongoDB)
app.post("/subscribe", async (req, res) => {
  try {
    const { userName, planName, durationMonths } = req.body;

    if (!userName || !planName || durationMonths == null) {
      return res.status(400).json({
        message: "userName, planName, and durationMonths are required",
      });
    }

    const months = Number(durationMonths);
    if (Number.isNaN(months) || months <= 0) {
      return res.status(400).json({
        message: "durationMonths must be a positive number",
      });
    }

    // save to DB
    const doc = await Subscription.create({
      userName: String(userName).trim(),
      planName,
      durationMonths: months,
      subscriptionStatus: "Active",
    });

    return res.status(201).json({
      message: `Subscription confirmed for ${doc.userName}`,
      subscription: doc,
    });
  } catch (err) {
    console.error("Subscribe error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// ✅ Connect DB then start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`✅ Backend running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });