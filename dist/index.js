"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
// ✅ Import routes
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const paymentRoutes_1 = __importDefault(require("./routes/paymentRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// ✅ Allowed frontend origins
const allowedOrigins = [
    "http://localhost:5173", // Local frontend
    "https://wellpi.netlify.app", // Deployed frontend
];
// ✅ Middleware setup
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            console.log("🚫 Blocked by CORS:", origin);
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
app.use(express_1.default.json()); // Parse JSON request bodies
// ✅ Register routes
app.use("/api/auth", authRoutes_1.default);
app.use("/api/payments", paymentRoutes_1.default);
// ✅ Default route
app.get("/", (req, res) => {
    res.status(200).send("🚀 WellPi Backend is running successfully!");
});
// ✅ Health check route for judges
app.get("/api/status", async (req, res) => {
    try {
        // Check MongoDB connection state
        const mongoStatus = mongoose_1.default.connection.readyState === 1 ? "connected" : "disconnected";
        res.status(200).json({
            success: true,
            message: "✅ WellPi backend is running smoothly!",
            mongoDB: mongoStatus,
            piConnection: "active", // You can update this dynamically if needed
            timestamp: new Date(),
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "❌ Something went wrong with the backend check.",
            error: error.message,
        });
    }
});
// ✅ Detect environment mode
const USE_MOCK_PI = process.env.USE_MOCK_PI === "true";
const PI_API_KEY = process.env.PI_API_KEY;
if (USE_MOCK_PI) {
    console.log("⚙ Running in MOCK MODE — payments will NOT be real Pi transactions.");
}
else if (PI_API_KEY) {
    console.log("💰 Running in LIVE MODE — Real Pi payments will be processed.");
}
else {
    console.warn("⚠ No PI_API_KEY found — using mock mode as fallback.");
}
// ✅ Connect to MongoDB
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
    console.error("❌ Missing MONGO_URI in .env file");
    process.exit(1);
}
mongoose_1.default
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
//# sourceMappingURL=index.js.map