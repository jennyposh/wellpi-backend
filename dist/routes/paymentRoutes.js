"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const piService_1 = require("../services/piService");
const router = (0, express_1.Router)();
/**
 * ✅ Create Pi Payment
 */
router.post('/create', async (req, res) => {
    try {
        const { amount, memo, metadata, uid } = req.body;
        if (!amount || !memo) {
            return res.status(400).json({ message: 'Amount and memo are required' });
        }
        const result = await (0, piService_1.createPiPayment)({ amount, memo, metadata, uid });
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
/**
 * ✅ Complete Pi Payment
 */
router.post('/complete', async (req, res) => {
    try {
        const { paymentId, txid } = req.body;
        if (!paymentId || !txid) {
            return res.status(400).json({ message: 'paymentId and txid are required' });
        }
        const result = await (0, piService_1.completePiPayment)(paymentId, txid);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
/**
 * ✅ Cancel Pi Payment
 */
router.post('/cancel', async (req, res) => {
    try {
        const { paymentId } = req.body;
        if (!paymentId) {
            return res.status(400).json({ message: 'paymentId is required' });
        }
        const result = await (0, piService_1.cancelPiPayment)(paymentId);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=paymentRoutes.js.map