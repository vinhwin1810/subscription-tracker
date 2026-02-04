import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
  throw new Error(
    "DB_URI is not defined in production || development environment",
  );
}

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(`DB Connected in ${NODE_ENV} mode`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
