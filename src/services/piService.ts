// src/services/piService.ts
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// === Environment variables ===
const PI_API_URL = "https://api.minepi.com/v2/payments";
const PI_API_KEY = process.env.PI_API_KEY ?? "";
const USE_MOCK_PI = process.env.USE_MOCK_PI === "true"; // 👈 allows switching between test and real mode

if (!PI_API_KEY && !USE_MOCK_PI) {
  throw new Error("Missing PI_API_KEY in .env and not in mock mode");
}

const defaultHeaders = {
  Authorization: `Key ${PI_API_KEY}`,
  "Content-Type": "application/json",
};

type CreateArgs = {
  amount: number;
  memo: string;
  metadata: any;
  uid: string;
};

// === Mock data generator ===
const generateMockResponse = (action: string, extra = {}) => ({
  mock: true,
  action,
  status: "success",
  timestamp: new Date().toISOString(),
  ...extra,
});

// === CREATE Payment ===
export const createPiPayment = async ({ amount, memo, metadata, uid }: CreateArgs) => {
  if (USE_MOCK_PI) {
    console.log("⚙ [MOCK MODE] createPiPayment simulated.");
    return generateMockResponse("createPiPayment", { amount, memo, metadata, uid });
  }

  try {
    const payload = {
      amount,
      memo,
      metadata: { ...metadata, uid },
    };
    const response = await axios.post(PI_API_URL, payload, { headers: defaultHeaders });
    console.log("✅ createPiPayment response:", response.data);
    return response.data;
  } catch (err: unknown) {
    handleAxiosError(err, "creating Pi payment");
  }
};

// === COMPLETE Payment ===
export const completePiPayment = async (paymentId: string, txid: string) => {
  if (USE_MOCK_PI) {
    console.log("⚙ [MOCK MODE] completePiPayment simulated.");
    return generateMockResponse("completePiPayment", { paymentId, txid });
  }

  try {
    const url = `${PI_API_URL}/${paymentId}/complete`;
    const response = await axios.post(url, { txid }, { headers: defaultHeaders });
    console.log("✅ completePiPayment response:", response.data);
    return response.data;
  } catch (err: unknown) {
    handleAxiosError(err, "completing Pi payment");
  }
};

// === CANCEL Payment ===
export const cancelPiPayment = async (paymentId: string) => {
  if (USE_MOCK_PI) {
    console.log("⚙ [MOCK MODE] cancelPiPayment simulated.");
    return generateMockResponse("cancelPiPayment", { paymentId });
  }

  try {
    const url = `${PI_API_URL}/${paymentId}/cancel`;
    const response = await axios.post(url, {}, { headers: defaultHeaders });
    console.log("✅ cancelPiPayment response:", response.data);
    return response.data;
  } catch (err: unknown) {
    handleAxiosError(err, "cancelling Pi payment");
  }
};

// === VERIFY Payment ===
export const verifyPiPayment = async (paymentId: string) => {
  if (USE_MOCK_PI) {
    console.log("⚙ [MOCK MODE] verifyPiPayment simulated.");
    return generateMockResponse("verifyPiPayment", { paymentId, state: "completed" });
  }

  try {
    const url = `${PI_API_URL}/${paymentId}`;
    const response = await axios.get(url, { headers: defaultHeaders });
    console.log("✅ verifyPiPayment response:", response.data);
    return response.data;
  } catch (err: unknown) {
    handleAxiosError(err, "verifying Pi payment");
  }
};

// === Helper: handle Axios errors ===
function handleAxiosError(err: unknown, action: string): never {
  if (axios.isAxiosError(err)) {
    console.error(`❌ Axios error ${action}:`, err.response?.data ?? err.message);
    const message =
      (err.response?.data && (err.response.data as any).message) ||
      err.response?.statusText ||
      err.message ||
      `Unknown Pi API error while ${action}`;
    throw new Error(message);
  }
  if (err instanceof Error) {
    console.error(`❌ Error ${action}:`, err.message);
    throw err;
  }
  console.error(`❌ Unknown error while ${action}:`, err);
  throw new Error(`Unknown error ${action}`);
}