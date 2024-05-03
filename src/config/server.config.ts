import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;
const REDIS_PORT = +(process.env.REDIS_PORT || 6379);
const REDIS_HOST = process.env.REDIS_PORT || "127.0.0.1";

export { PORT, REDIS_HOST, REDIS_PORT };
