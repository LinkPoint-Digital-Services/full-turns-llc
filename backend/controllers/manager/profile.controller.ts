import {Response} from 'express';
import {AuthRequest} from '../../middleware/auth.middleware';
import {ProfileService} from '../../services/manager/profile.service';

export class ProfileController {
  static async updateProfile(req: AuthRequest, res: Response) {
    try {
      const {manager_id, updateData} = req.body;

      const updatedUser = await ProfileService.updateProfile(manager_id, {
        first_name: updateData.first_name,
        last_name: updateData.last_name,
        company_name: updateData.company_name,
        email_address: updateData.email_address,
        contact_no: updateData.contact_no
      });

      if (!updatedUser) {
        res.status(404).json({success: false, message: 'User not found'});
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        user: updatedUser
      });
    } catch (error: any) {
      res.status(400).json({success: false, message: error.message});
    }
  }
}
