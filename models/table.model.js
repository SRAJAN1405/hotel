import mongoose from "mongoose"; // Import mongoose module

const reservationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    guests: {
      type: String, // Could also use Number if you want to enforce numeric values
      required: true,
    },
    date: {
      type: String, // Could use Date type if you want to store as ISODate
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    specialRequests: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;
