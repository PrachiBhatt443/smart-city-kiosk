import mongoose from "mongoose";

const { Schema } = mongoose;

const ratingSchema = new Schema(
  {
    userId: { type: String, required: false }, // Optional for anonymous users
    crimeReduction: { type: Number, required: true },
    roadCondition: { type: Number, required: true },
    complaintResolution: { type: Number, required: true },
    noiseReduction: { type: Number, required: true },
    overcrowding: { type: Number, required: true },
    traffic: { type: Number, required: true },
    airQuality: { type: Number, required: true },
  },
  { timestamps: true }
);

mongoose.models = {};
export default mongoose.model("Rating", ratingSchema);
