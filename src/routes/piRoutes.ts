import express, { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// ✅ Approve Payment (Pi requests this after payment creation)
router.post("/approve", async (req: Request, res: Response) => {
  try {
    const { paymentId } = req.body;

    if (!paymentId) {
      return res.status(400).json({ error: "Missing paymentId" });
    }

    const response = await axios.post(
      `https://api.minepi.com/v2/payments/${paymentId}/approve`,
      {},
      {
        headers: {
          Authorization: `Key ${process.env.PI_API_KEY}`,
        },
      }
    );

    console.log("✅ Payment approved:", response.data);
    res.status(200).json({ success: true, data: response.data });
  } catch (error: any) {
    console.error("❌ Payment approval failed:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Complete Payment (Pi calls this when user confirms)
router.post("/complete", async (req: Request, res: Response) => {
  try {
    const { paymentId } = req.body;

    if (!paymentId) {
      return res.status(400).json({ error: "Missing paymentId" });
    }

    const response = await axios.post(
      `https://api.minepi.com/v2/payments/${paymentId}/complete`,
      {},
      {
        headers: {
          Authorization: `Key ${process.env.PI_API_KEY}`,
        },
      }
    );

    console.log("✅ Payment completed:", response.data);
    res.status(200).json({ success: true, data: response.data });
  } catch (error: any) {
    console.error("❌ Payment completion failed:", error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;