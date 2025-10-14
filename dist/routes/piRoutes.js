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
// ✅ Approve Payment (Pi requests this after payment creation)
router.post("/approve", async (req, res) => {
    try {
        const { paymentId } = req.body;
        if (!paymentId) {
            return res.status(400).json({ error: "Missing paymentId" });
        }
        const response = await axios_1.default.post(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {}, {
            headers: {
                Authorization: `Key ${process.env.PI_API_KEY}`,
            },
        });
        console.log("✅ Payment approved:", response.data);
        res.status(200).json({ success: true, data: response.data });
    }
    catch (error) {
        console.error("❌ Payment approval failed:", error.message);
        res.status(500).json({ error: error.message });
    }
});
// ✅ Complete Payment (Pi calls this when user confirms)
router.post("/complete", async (req, res) => {
    try {
        const { paymentId } = req.body;
        if (!paymentId) {
            return res.status(400).json({ error: "Missing paymentId" });
        }
        const response = await axios_1.default.post(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {}, {
            headers: {
                Authorization: `Key ${process.env.PI_API_KEY}`,
            },
        });
        console.log("✅ Payment completed:", response.data);
        res.status(200).json({ success: true, data: response.data });
    }
    catch (error) {
        console.error("❌ Payment completion failed:", error.message);
        res.status(500).json({ error: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=piRoutes.js.map