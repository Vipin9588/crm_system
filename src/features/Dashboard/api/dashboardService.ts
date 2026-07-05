
import getProductstatus, {
  type Status as ProductStatus,
} from "@/features/product/api/getStatus";
import { getCustomerStaus } from "@/features/Customer/api/getCustomers";
import countDoc from "@/services/countDoc";
import type { Order } from "@/features/Order/api/orderStatus";
import {
  toStatusSlices,
  toMonthlyRevenue,
  type StatusSlice,
  type MonthRevenue,
} from "@/features/Order/api/chartData";

export interface DashboardData {
  productStatus: ProductStatus;
  customerCount: number;
  totalOrders: number;
  totalRevenue: number;
  orderStatusSlices: StatusSlice[];
  monthlyRevenue: MonthRevenue[];
  recentOrders: Order[];
}

const emptyProductStatus: ProductStatus = {
  categories: [],
  totalProducts: 0,
  lowStock: 0,
  inventoryValue: 0,
  products: [],
  monthlyAnalytic: [],
};

export async function getDashboardData(userId: string): Promise<DashboardData> {
  const [productStatus, customers, orders] = await Promise.all([
    getProductstatus(userId),
    getCustomerStaus(userId),
    countDoc<Order>(userId, "Orders"),
  ]);

  const orderStatusSlices = toStatusSlices(orders);
  const monthlyRevenue = toMonthlyRevenue(orders, 6);

  const totalRevenue = orders
    .filter((o) => o.status === "delivered")
    .reduce((sum, o) => sum + (o.total ?? 0), 0);

  const recentOrders = [...orders]
    .sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 6);

  return {
    productStatus: productStatus ?? emptyProductStatus,
    customerCount: customers.length,
    totalOrders: orders.length,
    totalRevenue,
    orderStatusSlices,
    monthlyRevenue,
    recentOrders,
  };
}