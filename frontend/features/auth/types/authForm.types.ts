export type AuthFormFields = {
  first_name: string;
  last_name: string;
  email_address: string;
  contact_no: string;
  password: string;
  confirm_password?: string;  
  role: "manager" | "admin" | "superadmin";
  account_type?: "solo" | "company";
  company_name?: string;
  verificationCode?: string;
};
