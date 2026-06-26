export interface Customer {
  customerId: string;
  name: string;
  email: string;
  contact: string;
  userId: string;
  createdAt: string;
  socialLink: string[];
  pic: string;
  status?: "active" | "inactive";
  totalOrders?: number;
}