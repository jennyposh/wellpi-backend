import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// ✅ Import routes
import authRoutes from "./routes/authRoutes";
import paymentRoutes from "./routes/paymentRoutes";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 5000;

// ✅ Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173", // Local frontend
  "https://wellpi.netlify.app", // Deployed frontend
];

// ✅ Middleware setup
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("🚫 Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json()); // Parse JSON request bodies

// ✅ Register routes
app.use("/api/auth", authRoutes);
app.use("/api/payments", paymentRoutes);

// ✅ Default route
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("🚀 WellPi Backend is running successfully!");
});
// ✅ Health check route for judges
app.get("/api/status", async (req: Request, res: Response) => {
  try {
    // Check MongoDB connection state
    const mongoStatus = mongoose.connection.readyState === 1 ? "connected" : "disconnected";

    res.status(200).json({
      success: true,
      message: "✅ WellPi backend is running smoothly!",
      mongoDB: mongoStatus,
      piConnection: "active", // You can update this dynamically if needed
      timestamp: new Date(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "❌ Something went wrong with the backend check.",
      error: (error as Error).message,
    });
  }
});

// ✅ Detect environment mode
const USE_MOCK_PI = process.env.USE_MOCK_PI === "true";
const PI_API_KEY = process.env.PI_API_KEY;

if (USE_MOCK_PI) {
  console.log("⚙ Running in MOCK MODE — payments will NOT be real Pi transactions.");
} else if (PI_API_KEY) {
  console.log("💰 Running in LIVE MODE — Real Pi payments will be processed.");
} else {
  console.warn("⚠ No PI_API_KEY found — using mock mode as fallback.");
}

// ✅ Connect to MongoDB
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error("❌ Missing MONGO_URI in .env file");
  process.exit(1);
}

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("✅ Connected to MongoDB successfully");

    // ✅ Start the server only after DB connection
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });