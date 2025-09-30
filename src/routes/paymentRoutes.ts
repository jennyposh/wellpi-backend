import { Router, Request, Response } from 'express';
import { createPiPayment, completePiPayment, cancelPiPayment } from '../services/piService';

const router = Router();

/**
 * ✅ Create Pi Payment
 */
router.post('/create', async (req: Request, res: Response) => {
  try {
    const { amount, memo, metadata, uid } = req.body;

    if (!amount || !memo) {
      return res.status(400).json({ message: 'Amount and memo are required' });
    }

    const result = await createPiPayment({ amount, memo, metadata, uid });
    res.status(201).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * ✅ Complete Pi Payment
 */
router.post('/complete', async (req: Request, res: Response) => {
  try {
    const { paymentId, txid } = req.body;

    if (!paymentId || !txid) {
      return res.status(400).json({ message: 'paymentId and txid are required' });
    }

    const result = await completePiPayment(paymentId, txid);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * ✅ Cancel Pi Payment
 */
router.post('/cancel', async (req: Request, res: Response) => {
  try {
    const { paymentId } = req.body;

    if (!paymentId) {
      return res.status(400).json({ message: 'paymentId is required' });
    }

    const result = await cancelPiPayment(paymentId);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;