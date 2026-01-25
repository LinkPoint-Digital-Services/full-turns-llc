export interface AddBufferRequest {
  manager_name: string;
  buffer_price: string;
  admin_id: string;
}

export interface DeleteBufferRequest {
  admin_id: string;
  buffer_id: string;
}

export interface getBuffer {
  manager_name: string;
  buffer_price: string;
}

export interface BufferItem {
  _id: string;
  buffer_id: string;
  manager_name: string;
  buffer_price: string;
  created_at: string;
  updated_at: string;
}
