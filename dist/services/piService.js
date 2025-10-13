"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPiPayment = exports.cancelPiPayment = exports.completePiPayment = exports.createPiPayment = void 0;
// src/services/piService.ts
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
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
// === Mock data generator ===
const generateMockResponse = (action, extra = {}) => ({
    mock: true,
    action,
    status: "success",
    timestamp: new Date().toISOString(),
    ...extra,
});
// === CREATE Payment ===
const createPiPayment = async ({ amount, memo, metadata, uid }) => {
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
        const response = await axios_1.default.post(PI_API_URL, payload, { headers: defaultHeaders });
        console.log("✅ createPiPayment response:", response.data);
        return response.data;
    }
    catch (err) {
        handleAxiosError(err, "creating Pi payment");
    }
};
exports.createPiPayment = createPiPayment;
// === COMPLETE Payment ===
const completePiPayment = async (paymentId, txid) => {
    if (USE_MOCK_PI) {
        console.log("⚙ [MOCK MODE] completePiPayment simulated.");
        return generateMockResponse("completePiPayment", { paymentId, txid });
    }
    try {
        const url = `${PI_API_URL}/${paymentId}/complete`;
        const response = await axios_1.default.post(url, { txid }, { headers: defaultHeaders });
        console.log("✅ completePiPayment response:", response.data);
        return response.data;
    }
    catch (err) {
        handleAxiosError(err, "completing Pi payment");
    }
};
exports.completePiPayment = completePiPayment;
// === CANCEL Payment ===
const cancelPiPayment = async (paymentId) => {
    if (USE_MOCK_PI) {
        console.log("⚙ [MOCK MODE] cancelPiPayment simulated.");
        return generateMockResponse("cancelPiPayment", { paymentId });
    }
    try {
        const url = `${PI_API_URL}/${paymentId}/cancel`;
        const response = await axios_1.default.post(url, {}, { headers: defaultHeaders });
        console.log("✅ cancelPiPayment response:", response.data);
        return response.data;
    }
    catch (err) {
        handleAxiosError(err, "cancelling Pi payment");
    }
};
exports.cancelPiPayment = cancelPiPayment;
// === VERIFY Payment ===
const verifyPiPayment = async (paymentId) => {
    if (USE_MOCK_PI) {
        console.log("⚙ [MOCK MODE] verifyPiPayment simulated.");
        return generateMockResponse("verifyPiPayment", { paymentId, state: "completed" });
    }
    try {
        const url = `${PI_API_URL}/${paymentId}`;
        const response = await axios_1.default.get(url, { headers: defaultHeaders });
        console.log("✅ verifyPiPayment response:", response.data);
        return response.data;
    }
    catch (err) {
        handleAxiosError(err, "verifying Pi payment");
    }
};
exports.verifyPiPayment = verifyPiPayment;
// === Helper: handle Axios errors ===
function handleAxiosError(err, action) {
    if (axios_1.default.isAxiosError(err)) {
        console.error(`❌ Axios error ${action}:`, err.response?.data ?? err.message);
        const message = (err.response?.data && err.response.data.message) ||
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
//# sourceMappingURL=piService.js.map