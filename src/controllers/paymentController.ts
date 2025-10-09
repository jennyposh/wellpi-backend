import { Request, Response } from "express";
import {
  createPiPayment,
  completePiPayment,
  cancelPiPayment,
  verifyPiPayment,
} from "../services/piService";

// ✅ POST /api/payments/create
export const createPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { amount, memo = "", metadata, uid } = req.body;

    if (typeof amount !== "number" || !uid) {
      res.status(400).json({ message: "amount (number) and uid are required" });
      return;
    }

    const result = await createPiPayment({ amount, memo, metadata, uid });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// ✅ POST /api/payments/complete
export const completePayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { paymentId, txid } = req.body;

    if (!paymentId || !txid) {
      res.status(400).json({ message: "paymentId and txid are required" });
      return;
    }

    const result = await completePiPayment(paymentId, txid);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// ✅ POST /api/payments/cancel
export const cancelPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { paymentId } = req.body;

    if (!paymentId) {
      res.status(400).json({ message: "paymentId is required" });
      return;
    }

    const result = await cancelPiPayment(paymentId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// ✅ POST /api/payments/verify
export const verifyPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { paymentId } = req.body;

    if (!paymentId) {
      res.status(400).json({ message: "paymentId is required" });
      return;
    }

    // 🧩 Call the service function (this is now imported from piService)
    const result = await verifyPiPayment(paymentId);

    if (result.status === "completed") {
      res.status(200).json({
        success: true,
        message: "Payment verified successfully (sandbox)",
        data: result,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Payment not completed",
        data: result,
      });
    }
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};