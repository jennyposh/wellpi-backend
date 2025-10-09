import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// ✅ Check for API key in .env
if (!process.env.PI_API_KEY) {
  throw new Error("❌ Missing PI_API_KEY in .env file");
}

// ✅ Set up constants
const PI_API_URL = "https://api.minepi.com/v2/payments";
const PI_API_KEY = process.env.PI_API_KEY!;

// ✅ Create Pi Payment
export const createPiPayment = async ({
  amount,
  memo,
  metadata,
  uid,
}: {
  amount: number;
  memo: string;
  metadata: any;
  uid: string;
}) => {
  try {
    // 🧩 Attach uid to metadata
    const paymentData = {
      amount,
      memo,
      metadata: {
        ...metadata,
        uid, // attach user ID here
      },
    };

    const response = await axios.post(PI_API_URL, paymentData, {
      headers: {
        "Authorization": `Key ${PI_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    console.log("✅ Pi payment created:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ Error creating Pi payment:", error.response?.data || error.message);
    console.log("🔍 Full Pi API error:", error.response?.data);
    throw new Error(error.response?.data?.message || "Failed to create Pi payment");
  }
};

// ✅ Complete Pi Payment
export const completePiPayment = async (paymentId: string, txid: string) => {
  try {
    const response = await axios.post(
      `${PI_API_URL}/${paymentId}/complete`,
      { txid },
      {
        headers: {
          "Authorization": `Key ${PI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Pi payment completed:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ Error completing Pi payment:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to complete Pi payment");
  }
};

// ✅ Cancel Pi Payment
export const cancelPiPayment = async (paymentId: string) => {
  try {
    const response = await axios.post(
      `${PI_API_URL}/${paymentId}/cancel`,
      {},
      {
        headers: {
          "Authorization": `Key ${PI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Pi payment cancelled:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ Error cancelling Pi payment:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to cancel Pi payment");
  }
};

// ✅ Verify Pi Payment
export const verifyPiPayment = async (paymentId: string) => {
  try {
    const response = await axios.get(`${PI_API_URL}/${paymentId}`, {
      headers: {
        "Authorization": `Key ${PI_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    console.log("✅ Pi payment verified:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ Error verifying Pi payment:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to verify Pi payment");
  }
};