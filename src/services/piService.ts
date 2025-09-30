import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const piApi = axios.create({
  baseURL: 'https://api.minepi.com', // Pi Network API Base URL
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Key ${process.env.PI_API_KEY}'
  }
});

/**
 * ✅ Create Pi Payment
 */
export const createPiPayment = async ({
  amount,
  memo,
  metadata,
  uid
}: {
  amount: number;
  memo: string;
  metadata: any;
  uid: any;
}) => {
  try {
    const response = await piApi.post('/v2/payments', {
      amount,
      memo,
      metadata
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Error creating Pi payment');
  }
};

/**
 * ✅ Complete Pi Payment
 */
export const completePiPayment = async (paymentId: string, txid: string) => {
  try {
    const response = await piApi.post('/v2/payments/${paymentId}/complete', {
      txid
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Error completing Pi payment');
  }
};

/**
 * ✅ Cancel Pi Payment
 */
export const cancelPiPayment = async (paymentId: string) => {
  try {
    const response = await piApi.post('/v2/payments/${paymentId}/cancel');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Error canceling Pi payment');
  }
};