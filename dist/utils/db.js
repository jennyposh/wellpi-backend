"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectDB = async () => {
    try {
        // ✅ Use .env MONGO_URI or fallback to local MongoDB
        const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/wellpi";
        console.log("🟡 Connecting to MongoDB...");
        await mongoose_1.default.connect(mongoURI, {
            // Optional modern config for stability
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log("✅ MongoDB Connected Successfully!");
    }
    catch (error) {
        console.error("❌ MongoDB Connection Failed:", error.message);
        process.exit(1); // Exit the app if DB connection fails
    }
};
exports.default = connectDB;
//# sourceMappingURL=db.js.map