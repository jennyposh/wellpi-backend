"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const piApi = axios_1.default.create({
    baseURL: 'https://api.minepi.com', // Pi Network API base URL
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'Key ${process.env.PI_API_KEY}', // Get API key from .env
    },
});
exports.default = piApi;
//# sourceMappingURL=piApi.js.map