import mongoose from "mongoose"; // Import mongoose module

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: String, // Keeping as String to preserve "₹" symbol; use Number if you want to store only numeric value
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Starters",
        "Main Course",
        "Breads",
        "Desserts",
        "Beverages",
        "Rice & Biryani",
      ], // Restricts to predefined categories
      trim: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const MenuItem = mongoose.model("MenuItem", menuItemSchema);

export default MenuItem;
