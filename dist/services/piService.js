"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelPiPayment = exports.completePiPayment = exports.createPiPayment = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const piApi = axios_1.default.create({
    baseURL: 'https://api.minepi.com', // Pi Network API Base URL
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'Key ${process.env.PI_API_KEY}'
    }
});
/**
 * ✅ Create Pi Payment
 */
const createPiPayment = async ({ amount, memo, metadata, uid }) => {
    try {
        const response = await piApi.post('/v2/payments', {
            amount,
            memo,
            metadata
        });
        return response.data;
    }
    catch (error) {
        throw new Error(error.response?.data?.error || 'Error creating Pi payment');
    }
};
exports.createPiPayment = createPiPayment;
/**
 * ✅ Complete Pi Payment
 */
const completePiPayment = async (paymentId, txid) => {
    try {
        const response = await piApi.post('/v2/payments/${paymentId}/complete', {
            txid
        });
        return response.data;
    }
    catch (error) {
        throw new Error(error.response?.data?.error || 'Error completing Pi payment');
    }
};
exports.completePiPayment = completePiPayment;
/**
 * ✅ Cancel Pi Payment
 */
const cancelPiPayment = async (paymentId) => {
    try {
        const response = await piApi.post('/v2/payments/${paymentId}/cancel');
        return response.data;
    }
    catch (error) {
        throw new Error(error.response?.data?.error || 'Error canceling Pi payment');
    }
};
exports.cancelPiPayment = cancelPiPayment;
//# sourceMappingURL=piService.js.map