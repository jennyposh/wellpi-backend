import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

// ✅ Import all route modules
import authRoutes from "./routes/authRoutes";
import paymentRoutes from "./routes/paymentRoutes"; // 👈 Added this line

dotenv.config();

const app = express();

// ✅ Allowed frontend URLs
const allowedOrigins = [
  "http://localhost:5173", // Local frontend (Vite)
  "https://wellpi.netlify.app" // Production frontend
];

// ✅ Configure CORS properly
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
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Handle preflight (OPTIONS) requests
app.options("*", cors());

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/payments", paymentRoutes); // 👈 Added this route

// ✅ Default route for testing backend status
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("🚀 WellPi Backend is running successfully!");
});

export default app;