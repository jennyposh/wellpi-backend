import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();

// ✅ Allowed frontend URLs
const allowedOrigins = [
  "http://localhost:5173",
  "https://wellpi.netlify.app"
];

// ✅ CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Handle preflight requests
app.options("*", cors());

// ✅ Parse JSON requests
app.use(express.json());

// ✅ API routes
app.use("/api/auth", authRoutes);

// ✅ Default route (optional, for testing)
app.get("/", (req, res) => {
  res.send("✅ WellPi Backend is running successfully!");
});

export default app;