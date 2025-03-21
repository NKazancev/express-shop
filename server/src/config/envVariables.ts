import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;
const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY!;
const REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY!;

export { PORT, ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY };
