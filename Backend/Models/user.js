const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["Customer", "Vendor", "DeliveryPersonnel"],
      default: "Customer",
    },
    deliveryPersonnelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeliveryPersonnel",
    }, // Optional: reference to delivery profile
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
