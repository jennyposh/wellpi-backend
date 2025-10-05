"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// ✅ Define allowed origins (local + production)
const allowedOrigins = [
    "http://localhost:5173",
    "https://wellpi.netlify.app",
];
// ✅ Configure CORS
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
app.use(express_1.default.json());
// ✅ Routes
app.use("/api/auth", authRoutes_1.default);
// ✅ Root route (optional, just to check connection)
app.get("/", (req, res) => {
    res.send("Backend is running successfully 🚀");
});
// ✅ MongoDB Connection
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(port, () => {
        console.log(`🚀 Server running on port ${port}`);
    });
})
    .catch((err) => console.error("❌ MongoDB connection error:", err));
//# sourceMappingURL=index.js.map