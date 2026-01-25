export interface IServices {
  service_name: string;
  service_category: string;
  service_video_url?: string;
  service_description: string;
  service_price: number;
  created_at?: Date;
  updated_at?: Date;
}