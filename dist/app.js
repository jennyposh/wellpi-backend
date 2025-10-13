"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./utils/db")); // ✅ Added this line for MongoDB connection
// ✅ Import all route modules
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const paymentRoutes_1 = __importDefault(require("./routes/paymentRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// ✅ Connect to MongoDB immediately when app starts
(0, db_1.default)();
// ✅ Allowed frontend URLs
const allowedOrigins = [
    "http://localhost:5173", // Local frontend (Vite)
    "https://wellpi.netlify.app" // Production frontend
];
// ✅ Configure CORS properly
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
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));
// ✅ Handle preflight (OPTIONS) requests
app.options("*", (0, cors_1.default)());
// ✅ Middleware to parse JSON
app.use(express_1.default.json());
// ✅ API Routes
app.use("/api/auth", authRoutes_1.default);
app.use("/api/payments", paymentRoutes_1.default);
// ✅ Default route for testing backend status
app.get("/", (req, res) => {
    res.status(200).send("🚀 WellPi Backend is running successfully!");
});
exports.default = app;
//# sourceMappingURL=app.js.map