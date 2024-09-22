import mongoose from 'mongoose';

const { Schema } = mongoose;

const CrimeReportSchema = new Schema({
  description: { type: String, required: true },
  crimeType: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  language: { type: String, default: 'English' },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

mongoose.models = {};
export default mongoose.model("CrimeReport", CrimeReportSchema);
