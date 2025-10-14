import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const PI_API_KEY = process.env.PI_API_KEY;
const PI_BACKEND_URL = "https://api.minepi.com/v2/payments";

// ✅ When Pi sends a webhook for approval
router.post("/webhook", async (req, res) => {
  try {
    const { txid, payment_id } = req.body;

    console.log("📩 Incoming Pi Webhook:", req.body);

    // Approve payment if it’s pending
    await axios.post(
      `${PI_BACKEND_URL}/${payment_id}/approve`,
      {},
      {
        headers: {
          Authorization: `Key ${PI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(`✅ Approved payment: ${payment_id}`);
    res.status(200).json({ success: true, message: "Payment approved" });
  } catch (error) {
    console.error("❌ Error approving payment:", error);
    res.status(500).json({ success: false, message: "Approval failed" });
  }
});

export default router;