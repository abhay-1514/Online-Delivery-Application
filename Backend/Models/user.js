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
    isBlocked: {
      type: Boolean,
      default: false, // Default value is false (not blocked)
    },
    deliveryPersonnelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeliveryPersonnel",
    }, // Optional: reference to delivery profile
    address: { type: String, required: true }, // Add the address field here
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
