import {Response} from "express";
import {OrderService} from "../../services/manager/order.service";
import {AuthRequest} from "../../middleware/auth.middleware";
import { promises as fs } from 'fs';
import { sendOrderEmail, OrderEmailData } from "../../lib/email";
import { envConfig } from "../../config/env.config";
import { IOrder, IOrderItem } from "../../interfaces/manager/IOrder";

const orderService = new OrderService();

interface ParsedOrderItem {
  itemId: string;
  name: string;
  price: number;
  quantity: number;
  details?: string;
}

function isValidOrderItem(item: unknown): item is ParsedOrderItem {
  if (typeof item !== 'object' || item === null) return false;
  const obj = item as Record<string, unknown>;
  return (
    typeof obj.itemId === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.price === 'number' &&
    typeof obj.quantity === 'number' &&
    (obj.details === undefined || typeof obj.details === 'string')
  );
}

export class OrderController {
  static async createOrder(req: AuthRequest, res: Response): Promise<Response> {
    const tempFiles: string[] = [];
    try {
      const managerId = req.user?._id.toString();
      if (!managerId) {
        return res.status(401).json({success: false, message: "Unauthorized"});
      }

      // Extract user info for email/records
      const user = req.user;
      let managerName = user && (user.first_name || user.last_name) 
        ? `${user.first_name || ''} ${user.last_name || ''}`.trim() 
        : 'Unknown Manager';
      
      let managerEmail = user?.email_address || 'no-email@provided.com';

      // Fallback: If name or email is missing/partial, fetch from DB
      if (user && (managerName === 'Unknown Manager' || managerEmail === 'no-email@provided.com')) {
          try {
             // We need to know the role to pick the right model. Default to 'manager' if not present, or try all?
             // req.user should have role given auth middleware.
             if (user.role) {
                 const { UserRepository } = await import('../../repositories/user.repository');
                 const userRepo = new UserRepository(user.role as 'manager' | 'admin' | 'superadmin');
                 const dbUser = await userRepo.findById(user._id.toString());
                 if (dbUser) {
                     managerName = `${dbUser.first_name || ''} ${dbUser.last_name || ''}`.trim();
                     managerEmail = dbUser.email_address;
                 }
             }
          } catch (err) {
              console.error('Error fetching user details for email:', err);
          }
      }

      // Parse items from FormData (sent as JSON string)
      let parsedItems: unknown;
      try {
        parsedItems = JSON.parse(req.body.items || '[]');
      } catch (error) {
        console.error('Failed to parse items:', error);
        return res.status(400).json({
          success: false,
          error: "Invalid items format"
        });
      }

      // Validate items
      if (!Array.isArray(parsedItems)) {
        return res.status(400).json({
          success: false,
          error: "Items must be an array"
        });
      }

      const items: IOrderItem[] = parsedItems.filter(isValidOrderItem);
      
      if (items.length === 0) {
        return res.status(400).json({
          success: false,
          error: "At least one valid item is required"
        });
      }

      const totalAmount = parseFloat(req.body.totalAmount || '0');

      // Get uploaded files
      const files = req.files as Express.Multer.File[];
      const hasFiles = files && files.length > 0;

      if (hasFiles) {
        // Track temp files for cleanup
        tempFiles.push(...files.map((file) => file.path));
      }
      
      const orderId = `ORD-${Date.now()}`;

      const orderData: Omit<IOrder, '_id' | 'createdAt' | 'updatedAt'> = {
        orderId,
        managerId,
        managerName,
        managerEmail,
        items,
        totalAmount: Number(totalAmount),
        status: "Pending",
        images: [], // No longer storing image URLs in database
        notes: req.body.notes || '',
        googleDriveLink: req.body.googleDriveLink || ''
      };

      const emailData: OrderEmailData = {
        orderId,
        managerId,
        name: managerName,
        email: managerEmail,
        items,
        totalAmount: Number(totalAmount),
        status: "Pending",
        notes: req.body.notes || '',
        googleDriveLink: req.body.googleDriveLink || ''
      };
      
      if (orderData.totalAmount === undefined || orderData.totalAmount === null || isNaN(orderData.totalAmount)) {
          return res.status(400).json({ 
            success: false,
            error: "Total amount is required and must be a valid number" 
          });
      }

      // Prepare attachments for email
      const attachments = hasFiles ? files.map((file) => ({
        filename: file.originalname,
        path: file.path,
      })) : [];

      // Configure the fixed recipient email address
      // const recipientEmail =
      //   process.env.ORDER_RECIPIENT_EMAIL || "estrada.lnp@gmail.com";

      const recipientEmail ="estrada.lnp@gmail.com";

      const result = await orderService.createOrder(orderData);
      
      // Send response immediately to unblock the UI
      res.status(201).json({success: true, data: result});

      // Send email and signup files in background
      // Note: We don't await this so the client gets a fast response
      sendOrderEmail({
        orderData: emailData,
        imageAttachments: attachments,
        recipientEmail,
      }).then(async () => {
         console.log(`Email sent successfully for order ${orderId}`);
         // Clean up temporary files after email is sent
         if (hasFiles) {
          await Promise.all(
            tempFiles.map((filePath) =>
              fs.unlink(filePath).catch((err) => {
                console.error(`Failed to delete temp file ${filePath}:`, err);
              }),
            ),
          );
        }
      }).catch(err => {
        console.error(`Failed to send email for order ${orderId}:`, err);
        // Clean up files even if email fails
         if (hasFiles) {
          Promise.all(
            tempFiles.map((filePath) =>
              fs.unlink(filePath).catch(() => {})
            ),
          );
        }
      });
      
      return res; // Return response object to satisfy TS, though response is already sent
    } catch (error) {
      if (tempFiles.length > 0) {
        await Promise.all(
          tempFiles.map((filePath) =>
            fs.unlink(filePath).catch(() => {})
          ),
        );
      }
      console.error("Create order error:", error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return res.status(400).json({success: false, message: errorMessage});
    }
  }

  static async getManagerOrders(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const managerId = req.user?._id;
      if (!managerId) {
        return res.status(401).json({success: false, message: "Unauthorized"});
      }

      const result = await orderService.getOrdersByManager(managerId as string);
      return res.status(200).json({success: true, data: result});
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return res.status(400).json({success: false, message: errorMessage});
    }
  }

  static async getAllOrders(req: AuthRequest, res: Response): Promise<Response> {
    try {
      // Check if user is admin
      if (req.user?.role !== "admin" && req.user?.role !== "superadmin") {
        return res.status(403).json({success: false, message: "Forbidden"});
      }

      const result = await orderService.getAllOrders();
      return res.status(200).json({success: true, data: result});
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return res.status(400).json({success: false, message: errorMessage});
    }
  }

  static async updateOrderStatus(req: AuthRequest, res: Response): Promise<Response> {
    try {
      // Check if user is admin
      if (req.user?.role !== "admin" && req.user?.role !== "superadmin") {
        return res.status(403).json({success: false, message: "Forbidden"});
      }

      const {orderId, status} = req.body;
      const result = await orderService.updateOrderStatus(orderId, status);
      return res.status(200).json({success: true, data: result});
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return res.status(400).json({success: false, message: errorMessage});
    }
  }
}
