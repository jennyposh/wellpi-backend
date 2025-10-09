import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
// ✅ Import routes
import authRoutes from "./routes/authRoutes";
import paymentRoutes from "./routes/paymentRoutes"; // 👈 Added this line

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 5000;

// ✅ Allowed origins
const allowedOrigins = [
  "http://localhost:5173", // local frontend
  "https://wellpi.netlify.app", // deployed frontend
];

// ✅ Middleware
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

app.use(express.json()); // Parse JSON bodies

// ✅ Register routes
app.use("/api/auth", authRoutes);
app.use("/api/payments", paymentRoutes); // 👈 Added payment route registration

// ✅ Default route
app.get("/", (req: Request, res: Response) => {
  res.send("Backend is running successfully 🚀");
});

// ✅ Connect to MongoDB and start the server
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));