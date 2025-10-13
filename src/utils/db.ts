import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    // ✅ Use .env MONGO_URI or fallback to local MongoDB
    const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/wellpi";

    console.log("🟡 Connecting to MongoDB...");

    await mongoose.connect(mongoURI, {
      // Optional modern config for stability
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log("✅ MongoDB Connected Successfully!");
  } catch (error: any) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1); // Exit the app if DB connection fails
  }
};

export default connectDB;