import { Router } from "express";
import {
  createPayment,
  completePayment,
  cancelPayment,
  verifyPayment
} from "../controllers/paymentController";

const router = Router();

/**
 * ✅ Create Pi Payment
 */
router.post("/create", createPayment);

/**
 * ✅ Complete Pi Payment
 */
router.post("/complete", completePayment);

/**
 * ✅ Cancel Pi Payment
 */
router.post("/cancel", cancelPayment);

/**
 * ✅ Verify Pi Payment
 */
router.post("/verify", verifyPayment);

export default router;