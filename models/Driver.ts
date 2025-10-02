import mongoose from "mongoose";

const DriverSchema = new mongoose.Schema({
  email: { type: String, unique: true, sparse: true },
  phone: { type: String, unique: true, sparse: true },
  password: { type: String },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  otp: String,
  otpExpiresAt: Date,

  // Profile Setup
  firstName: String,
  lastName: String,
  profilePicture: String,

  // Document Upload
  idNumber: String,
  documentFrontImage: String,
  documentBackImage: String,
  issueDate: Date,
  expiryDate: Date,

  // Vehicle(s)
  vehicle: [
    {
      type: { type: String },
      brand: String,
      model: String,
      color: String,
      plateNumber: String,
      image: String,
      addedAt: { type: Date, default: Date.now },
    }
  ],

  // Approval Status
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending Approval",
  },

  // 🔹 Availability (online/offline for rides)
  isOnline: { type: Boolean, default: true },

  // 🔹 Firebase tokens for push notifications
  fcmTokens: [{ type: String }],


});

export default mongoose.models.Driver || mongoose.model("Driver", DriverSchema);
