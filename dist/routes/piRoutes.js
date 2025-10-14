"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = express_1.default.Router();
const PI_API_KEY = process.env.PI_API_KEY;
const PI_BACKEND_URL = "https://api.minepi.com/v2/payments";
// ✅ When Pi sends a webhook for approval
router.post("/webhook", async (req, res) => {
    try {
        const { txid, payment_id } = req.body;
        console.log("📩 Incoming Pi Webhook:", req.body);
        // Approve payment if it’s pending
        await axios_1.default.post(`${PI_BACKEND_URL}/${payment_id}/approve`, {}, {
            headers: {
                Authorization: `Key ${PI_API_KEY}`,
                "Content-Type": "application/json",
            },
        });
        console.log(`✅ Approved payment: ${payment_id}`);
        res.status(200).json({ success: true, message: "Payment approved" });
    }
    catch (error) {
        console.error("❌ Error approving payment:", error);
        res.status(500).json({ success: false, message: "Approval failed" });
    }
});
exports.default = router;
//# sourceMappingURL=piRoutes.js.map