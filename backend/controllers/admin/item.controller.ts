import {Request, Response} from 'express';
import {ItemService} from '../../services/admin/item.service';

export class ItemController {
  static async addItem(req: Request, res: Response) {
    try {
      const {admin_id, item} = req.body;
      // Map itemId to _id for backend storage
      const result = await ItemService.addItem(admin_id, {
        ...item,
        _id: item.itemId
      });
      res.status(201).json({success: true, data: result});
    } catch (error: any) {
      res.status(400).json({success: false, message: error.message});
    }
  }

  static async updateItem(req: Request, res: Response) {
    try {
      const {admin_id, itemId, updateData} = req.body;
      // Filter out _id if it accidentally passed through
      const {_id, ...cleanData} = updateData;
      const result = await ItemService.updateItem(admin_id, itemId, cleanData);
      res.status(200).json({success: true, data: result});
    } catch (error: any) {
      res.status(400).json({success: false, message: error.message});
    }
  }

  static async deleteItem(req: Request, res: Response) {
    try {
      const {admin_id, item_id} = req.body; // Frontend sends item_id for delete
      const result = await ItemService.deleteItem(admin_id, item_id);
      res.status(200).json({success: true, data: result});
    } catch (error: any) {
      res.status(400).json({success: false, message: error.message});
    }
  }

  static async getItems(req: Request, res: Response) {
    const start = Date.now();
    try {
      const {admin_id} = req.query;
      console.log(
        `[ItemController.getItems] start admin_id=${admin_id ?? 'all'}`
      );
      const result = await ItemService.getItems(admin_id as string);
      console.log(
        `[ItemController.getItems] success count=${result.length} duration_ms=${
          Date.now() - start
        }`
      );
      res.status(200).json({success: true, data: result});
    } catch (error: any) {
      console.error(
        `[ItemController.getItems] error duration_ms=${Date.now() - start}`,
        error
      );
      res.status(400).json({success: false, message: error.message});
    }
  }
}
