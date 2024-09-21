import mongoose from 'mongoose';

const { Schema } = mongoose;

const busServiceSchema = new Schema({
  route: {
    type: String,
    required: true,
  },
  schedule: {
    type: String,
    required: true,
  },
  fare: {
    type: String,
    required: true,
  },
  bookings: [
    {
      passengerName: {
        type: String,
        required: true,
      },
      numberOfTickets: {
        type: Number,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
}, { timestamps: true });

mongoose.models = {};
export default mongoose.model("BusService", busServiceSchema);
