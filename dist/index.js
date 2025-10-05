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
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173", // ✅ adjust if frontend runs on 3000
    credentials: true,
}));
// Routes
app.use("/api/auth", authRoutes_1.default);
// MongoDB connection
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