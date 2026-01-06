import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    userName: { type: String, required: true, trim: true },
    planName: {
      type: String,
      required: true,
      enum: ["Basic", "Standard", "Premium"],
    },
    durationMonths: { type: Number, required: true, min: 1 },
    subscriptionStatus: { type: String, default: "Active" },
  },
  { timestamps: true }
);

export default mongoose.model("Subscription", SubscriptionSchema);