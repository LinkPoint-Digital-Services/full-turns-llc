import { Router, Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { promises as fs } from 'fs';
import { sendOrderEmail, OrderData } from '../lib/email';

const router = Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const tempDir = path.join(process.cwd(), 'tmp');
    try {
      await fs.mkdir(tempDir, { recursive: true });
      cb(null, tempDir);
    } catch (error) {
      cb(error as Error, tempDir);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, `order-${uniqueSuffix}${fileExtension}`);
  },
});

// File filter to accept only images
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images are allowed.'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit per file
  },
});

interface OrderFormData {
  name: string;
  address: string;
  orderDetails: string;
  //ahmmm add more details if clients ask for it
}

router.post('/', upload.array('images', 3), async (req: Request, res: Response) => {
  const tempFiles: string[] = [];

  try {
    // Extract order data from form fields
    const orderData: OrderFormData = {
      name: req.body.name as string,
      address: req.body.address as string,
      orderDetails: req.body.orderDetails as string,
      // add more fields here if new changes in the frontend
    };

    // Validate required fields
    if (!orderData.name || !orderData.address || !orderData.orderDetails) {
      return res.status(400).json({
        error: 'Missing required fields',
      });
    }

    // Get uploaded files
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      return res.status(400).json({
        error: 'At least one image is required',
      });
    }

    if (files.length > 3) {
      return res.status(400).json({
        error: 'Please upload 1 to 3 images',
      });
    }

    // Prepare attachments for email
    const attachments = files.map((file) => ({
      filename: file.originalname,
      path: file.path,
    }));

    // Track temp files for cleanup
    tempFiles.push(...files.map((file) => file.path));

    // Configure the fixed recipient email address
    const recipientEmail = process.env.ORDER_RECIPIENT_EMAIL || 'your-email@example.com';

    // Send email with order data and images
    await sendOrderEmail({
      orderData,
      imageAttachments: attachments,
      recipientEmail,
    });

    // Clean up temporary files
    await Promise.all(
      tempFiles.map((filePath) =>
        fs.unlink(filePath).catch((err) => {
          console.error(`Failed to delete temp file ${filePath}:`, err);
        })
      )
    );

    return res.status(200).json({
      message: 'Order submitted successfully',
    });
  } catch (error) {
    // Clean up temp files on error
    await Promise.all(
      tempFiles.map((filePath) =>
        fs.unlink(filePath).catch(() => {
          // Ignore cleanup errors
        })
      )
    );

    console.error('Error processing order:', error);
    return res.status(500).json({
      error: 'Failed to process order',
    });
  }
});

export default router;

