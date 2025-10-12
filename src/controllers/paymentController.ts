// src/controllers/paymentController.ts
import { Request, Response } from "express";

// 🧩 MOCK PAYMENT CONTROLLER (for hackathon testing/demo)
export const createPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { amount, memo = "", metadata, uid } = req.body;

    if (typeof amount !== "number" || !uid) {
      res.status(400).json({ success: false, message: "amount (number) and uid are required" });
      return;
    }

    console.log("💰 [Mock] Creating Pi payment...");
    console.log("Amount:", amount);
    console.log("Memo:", memo);
    console.log("UID:", uid);

    // Simulate successful payment
    const mockPayment = {
      id: "mock_" + Date.now(),
      amount,
      memo,
      uid,
      metadata,
      status: "completed",
      createdAt: new Date().toISOString(),
    };

    console.log("✅ [Mock] Payment created successfully");
    res.status(201).json({
      success: true,
      message: "✅ Mock Pi payment successful",
      data: mockPayment,
    });
  } catch (err) {
    console.error("❌ [Mock] Error creating payment:", (err as Error).message);
    res.status(500).json({ success: false, message: "Mock payment failed" });
  }
};

// ✅ Complete Payment (simulated)
export const completePayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { paymentId, txid } = req.body;

    if (!paymentId || !txid) {
      res.status(400).json({ success: false, message: "paymentId and txid are required" });
      return;
    }

    console.log("🔄 [Mock] Completing payment:", paymentId);
    res.status(200).json({
      success: true,
      message: "✅ Mock payment completed",
      data: { paymentId, txid, status: "completed" },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: (err as Error).message });
  }
};

// ✅ Cancel Payment (simulated)
export const cancelPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { paymentId } = req.body;

    if (!paymentId) {
      res.status(400).json({ success: false, message: "paymentId is required" });
      return;
    }

    console.log("🚫 [Mock] Cancelling payment:", paymentId);
    res.status(200).json({
      success: true,
      message: "🟡 Mock payment cancelled",
      data: { paymentId, status: "cancelled" },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: (err as Error).message });
  }
};

// ✅ Verify Payment (simulated)
export const verifyPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { paymentId } = req.body;

    if (!paymentId) {
      res.status(400).json({ success: false, message: "paymentId is required" });
      return;
    }

    console.log("🔍 [Mock] Verifying payment:", paymentId);
    res.status(200).json({
      success: true,
      message: "✅ Mock payment verified (sandbox)",
      data: { paymentId, status: "completed" },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: (err as Error).message });
  }
};