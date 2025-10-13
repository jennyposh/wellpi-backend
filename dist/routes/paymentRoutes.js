"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paymentController_1 = require("../controllers/paymentController");
const router = (0, express_1.Router)();
/**
 * ✅ Create Pi Payment
 */
router.post("/create", paymentController_1.createPayment);
/**
 * ✅ Complete Pi Payment
 */
router.post("/complete", paymentController_1.completePayment);
/**
 * ✅ Cancel Pi Payment
 */
router.post("/cancel", paymentController_1.cancelPayment);
/**
 * ✅ Verify Pi Payment
 */
router.post("/verify", paymentController_1.verifyPayment);
exports.default = router;
//# sourceMappingURL=paymentRoutes.js.map