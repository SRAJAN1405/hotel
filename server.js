import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import tableRoute from "./routes/table.route.js";
import menuRoute from "./routes/menu.route.js";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import orderRoute from "./routes/order.route.js";

dotenv.config();

const PORT = process.env.PORT || 10000;

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS
app.use(
  cors({
    origin: "*", // Change this to your actual frontend URL or "*" for all origins
    credentials: true,
  })
);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API route
app.use("/api/table", tableRoute);
app.use("/api/menu", menuRoute);
app.use("/api/order", orderRoute);
console.log("my path", __dirname);

// Static files
const distPath = path.resolve(__dirname, "client", "dist");
app.use(express.static(distPath));
console.log("my dist path", distPath);

// Debug middleware to log incoming requests
app.use((req, res, next) => {
  console.log("Request path:", req.path);
  next();
});

// Fallback using a static file handler (no wildcard)
app.use((req, res) => {
  console.log("Serving index.html for path:", req.path);
  res.sendFile(
    path.resolve(__dirname, "client", "dist", "index.html"),
    (err) => {
      if (err) {
        console.error("Error serving index.html:", err);
        res.status(500).send("Error loading the application");
      }
    }
  );
});

// Connect MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://sajjukumar477:rVfQga4CgdDb1jmI@cluster0.feujzk0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};

connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err.stack);
  res.status(500).send("Something went wrong!");
});
