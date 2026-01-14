import {verifyAccessToken} from '../utils/jwt.utils';
import {NextFunction, Request, Response} from 'express';
import {IAuthUser} from '../interfaces/auth/IAuthUser';

export interface AuthRequest extends Request {
  user?: IAuthUser;
}

//Every api request this middleware will be called to verify the accessToken
export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1] || req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({message: 'Access token missing'});
  }

  const decoded = verifyAccessToken(token);
  
  if (!decoded) {
    return res.status(403).json({message: 'Invalid or expired token'});
  }

  const {userId, email_address, first_name, last_name} = decoded as any;
  req.user = {_id: userId, email_address, first_name, last_name, role: decoded.role};
  next();
};