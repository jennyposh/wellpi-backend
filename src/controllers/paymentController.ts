// src/controllers/paymentController.ts
import { Request, Response } from "express";
import {
  createPiPayment,
  completePiPayment,
  cancelPiPayment,
  verifyPiPayment,
} from "../services/piService";

export const createPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { amount, memo = "", metadata = {}, uid } = req.body;

    if (typeof amount !== "number" || !uid) {
      res.status(400).json({ message: "amount (number) and uid are required" });
      return;
    }

    const result = await createPiPayment({ amount, memo, metadata, uid });
    res.status(201).json(result);
  } catch (err: unknown) {
    console.error("createPayment error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ message });
  }
};

export const completePayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { paymentId, txid } = req.body;
    if (!paymentId || !txid) {
      res.status(400).json({ message: "paymentId and txid are required" });
      return;
    }
    const result = await completePiPayment(paymentId, txid);
    res.status(200).json(result);
  } catch (err: unknown) {
    console.error("completePayment error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ message });
  }
};

export const cancelPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { paymentId } = req.body;
    if (!paymentId) {
      res.status(400).json({ message: "paymentId is required" });
      return;
    }
    const result = await cancelPiPayment(paymentId);
    res.status(200).json(result);
  } catch (err: unknown) {
    console.error("cancelPayment error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ message });
  }
};

export const verifyPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { paymentId } = req.body;
    if (!paymentId) {
      res.status(400).json({ message: "paymentId is required" });
      return;
    }

    const result = await verifyPiPayment(paymentId);

    // result shape depends on Pi API; handle safely:
    const status = (result && (result as any).status) || (result as any).state || "unknown";

    if (status === "completed" || status === "succeeded") {
      res.status(200).json({ success: true, message: "Payment verified", data: result });
    } else {
      res.status(400).json({ success: false, message: "Payment not completed", data: result });
    }
  } catch (err: unknown) {
    console.error("verifyPayment error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ message });
  }
};