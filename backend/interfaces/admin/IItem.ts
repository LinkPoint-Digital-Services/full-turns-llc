export interface IAddOn {
  addOnsId?: string;
  name: string;
  price: number;
}

export interface IItem {
  _id: string; // Corresponds to itemId from frontend
  admin_id: string;
  serviceId: string;
  name: string;
  icon: string;
  basePrice: number;
  measurement: string;
  allowCustomDetails: boolean;
  notes?: string;
  addOns: IAddOn[];
  created_at?: Date;
  updated_at?: Date;
}
