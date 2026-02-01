import { Request, Response } from 'express';
import { ServiceService } from '../../services/admin/service.service';

export class ServiceController {
  static async addService(req: Request, res: Response) {
    try {
      const { admin_id, service } = req.body;
      const result = await ServiceService.addService(admin_id, service);
      res.status(201).json({ success: true, data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async updateService(req: Request, res: Response) {
    try {
      const { admin_id, serviceId, updateData } = req.body;
      const result = await ServiceService.updateService(admin_id, serviceId, updateData);
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async deleteService(req: Request, res: Response) {
    try {
      const { admin_id, service_id } = req.body; // Frontend sends service_id for delete
      const result = await ServiceService.deleteService(admin_id, service_id);
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async getServices(req: Request, res: Response) {
    try {
      const { admin_id } = req.query;
      const result = await ServiceService.getServices(admin_id as string);
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}
