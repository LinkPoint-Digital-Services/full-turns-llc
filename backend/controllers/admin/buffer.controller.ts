import {Request, Response} from 'express';
import asynchandler from 'express-async-handler';
import {BufferService} from '../../services/admin/buffer.service';

const bufferService = new BufferService();

export const addBuffer = asynchandler(async (req: Request, res: Response) => {
  const buffer = await bufferService.addBuffer(req.body);

  res.status(201).json({
    success: true,
    message: 'Buffer added successfully',
    data: buffer
  });
});

export const getBuffers = asynchandler(async (req: Request, res: Response) => {
  const {admin_id} = req.query;

  if (!admin_id || typeof admin_id !== 'string') {
    res.status(400);
    throw new Error('admin_id is required');
  }
  
  const buffers = await bufferService.getBuffers(admin_id);

  res.status(200).json({
    success: true,
    message: 'Buffers fetched successfully',
    data: buffers
  });
});

export const deleteBuffer = asynchandler(
  async (req: Request, res: Response) => {
    const result = await bufferService.deleteBuffer(req.body);

    res.status(200).json({
      success: true,
      message: 'Buffer deleted successfully',
      data: result
    });
  }
);
