import dotenv from 'dotenv';
dotenv.config();

export const envConfig = {
  MONGO_URI: process.env.MONGO_URI as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  ORDER_RECIPIENT_EMAIL: process.env.ORDER_RECIPIENT_EMAIL,
}