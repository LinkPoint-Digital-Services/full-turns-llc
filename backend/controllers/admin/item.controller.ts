import { Request, Response } from 'express';
import { ItemService } from '../../services/admin/item.service';

export class ItemController {
  static async addItem(req: Request, res: Response) {
    try {
      const { admin_id, item } = req.body;
      // Map itemId to _id for backend storage
      const result = await ItemService.addItem(admin_id, { ...item, _id: item.itemId });
      res.status(201).json({ success: true, data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async updateItem(req: Request, res: Response) {
    try {
      const { admin_id, itemId, updateData } = req.body;
      const result = await ItemService.updateItem(admin_id, itemId, updateData);
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async deleteItem(req: Request, res: Response) {
    try {
      const { admin_id, item_id } = req.body; // Frontend sends item_id for delete
      const result = await ItemService.deleteItem(admin_id, item_id);
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async getItems(req: Request, res: Response) {
    try {
      const { admin_id } = req.query;
      const result = await ItemService.getItems(admin_id as string);
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}
