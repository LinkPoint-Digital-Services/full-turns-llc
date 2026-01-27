export interface UpdateProfileRequest {
  manager_id: string;
  updateData: {
    first_name?: string;
    last_name?: string;
    company_name?: string;
    email_address?: string;
    contact_no?: string;
  };
}