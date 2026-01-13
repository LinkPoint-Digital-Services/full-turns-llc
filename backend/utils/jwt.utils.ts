import jwt, {JwtPayload} from 'jsonwebtoken';
import { envConfig } from '../config/env.config';

const ACCESSTOKEN_EXPIRES_IN = '7d' // 7 days

interface TokenPayload {
  userId: string;
  email: string;
}

export const generateAccessToken = (paylaod: TokenPayload): string => {
 return jwt.sign(paylaod, envConfig.JWT_SECRET, {expiresIn: ACCESSTOKEN_EXPIRES_IN});
}

export const verifyAccessToken = (token: string): JwtPayload | null  => {
  try {
    return jwt.verify(token, envConfig.JWT_SECRET) as JwtPayload;
  } catch (error) {
    return null;
  }
}