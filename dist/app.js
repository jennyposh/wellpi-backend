"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// ✅ Allowed frontend URLs
const allowedOrigins = [
    "http://localhost:5173",
    "https://wellpi.netlify.app"
];
// ✅ CORS configuration
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            console.log("❌ Blocked by CORS:", origin);
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));
// ✅ Handle preflight requests
app.options("*", (0, cors_1.default)());
// ✅ Parse JSON requests
app.use(express_1.default.json());
// ✅ API routes
app.use("/api/auth", authRoutes_1.default);
// ✅ Default route (optional, for testing)
app.get("/", (req, res) => {
    res.send("✅ WellPi Backend is running successfully!");
});
exports.default = app;
//# sourceMappingURL=app.js.map