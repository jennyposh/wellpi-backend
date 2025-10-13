"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPayment = exports.cancelPayment = exports.completePayment = exports.createPayment = void 0;
const piService_1 = require("../services/piService");
const createPayment = async (req, res) => {
    try {
        const { amount, memo = "", metadata = {}, uid } = req.body;
        if (typeof amount !== "number" || !uid) {
            res.status(400).json({ message: "amount (number) and uid are required" });
            return;
        }
        const result = await (0, piService_1.createPiPayment)({ amount, memo, metadata, uid });
        res.status(201).json(result);
    }
    catch (err) {
        console.error("createPayment error:", err);
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ message });
    }
};
exports.createPayment = createPayment;
const completePayment = async (req, res) => {
    try {
        const { paymentId, txid } = req.body;
        if (!paymentId || !txid) {
            res.status(400).json({ message: "paymentId and txid are required" });
            return;
        }
        const result = await (0, piService_1.completePiPayment)(paymentId, txid);
        res.status(200).json(result);
    }
    catch (err) {
        console.error("completePayment error:", err);
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ message });
    }
};
exports.completePayment = completePayment;
const cancelPayment = async (req, res) => {
    try {
        const { paymentId } = req.body;
        if (!paymentId) {
            res.status(400).json({ message: "paymentId is required" });
            return;
        }
        const result = await (0, piService_1.cancelPiPayment)(paymentId);
        res.status(200).json(result);
    }
    catch (err) {
        console.error("cancelPayment error:", err);
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ message });
    }
};
exports.cancelPayment = cancelPayment;
const verifyPayment = async (req, res) => {
    try {
        const { paymentId } = req.body;
        if (!paymentId) {
            res.status(400).json({ message: "paymentId is required" });
            return;
        }
        const result = await (0, piService_1.verifyPiPayment)(paymentId);
        // result shape depends on Pi API; handle safely:
        const status = (result && result.status) || result.state || "unknown";
        if (status === "completed" || status === "succeeded") {
            res.status(200).json({ success: true, message: "Payment verified", data: result });
        }
        else {
            res.status(400).json({ success: false, message: "Payment not completed", data: result });
        }
    }
    catch (err) {
        console.error("verifyPayment error:", err);
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ message });
    }
};
exports.verifyPayment = verifyPayment;
//# sourceMappingURL=paymentController.js.map