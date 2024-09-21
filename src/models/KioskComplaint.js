import mongoose from "mongoose";

const { Schema } = mongoose;

const kioskComplaintSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: false,
  },
  resolved: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

mongoose.models = {};
export default mongoose.model("KioskComplaint", kioskComplaintSchema);
