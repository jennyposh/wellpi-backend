import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const piApi = axios.create({
  baseURL: 'https://api.minepi.com', // Pi Network API base URL
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Key ${process.env.PI_API_KEY}', // Get API key from .env
  },
});

export default piApi;