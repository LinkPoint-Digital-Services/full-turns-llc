export interface User {
  _id?: string;
  first_name: string;
  last_name: string;
  email_address: string;
  contact_no: string;
  password?: string; 
  role: "manager" | "admin" | "superadmin";
  account_type?: "solo" | "company";
  company_name?: string;
  verificationCode?: string;
  created_at?: string;
  updated_at?: string;
}
