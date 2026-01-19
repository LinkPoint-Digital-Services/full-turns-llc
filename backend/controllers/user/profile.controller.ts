import {Response} from 'express';
import asyncHandler from 'express-async-handler';
import {AuthRequest} from '../../middleware/auth.middleware';
import {UserRepository} from '../../repositories/user.repository';

export const getMe = asyncHandler(async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    res.status(401).json({message: 'Unauthorized'});
    return;
  }
  const {_id, role} = req.user;

  const userRepository = new UserRepository(role);

  const user = await userRepository.findById(
    _id.toString(),
    '-password -verificationCode'
  );

  if (!user) {
    res.status(404).json({message: 'User not found'});
    return;
  }

  res.status(200).json({
    message: 'User verified successfully',
    user
  });
});
