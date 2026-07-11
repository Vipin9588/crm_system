import countDoc from "../../../services/countDoc";
import type { Order } from "../../Order/api/orderStatus";
import {
  toStatusSlices,
  toMonthlyRevenue,
  type StatusSlice,
  type MonthRevenue,
} from "../../Order/api/chartData";

export interface TopProduct {
  productId: string;
  name: string;
  quantitySold: number;
  revenue: number;
}

export interface SalesData {
  totalRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
  revenueGrowth: number; // % vs previous month
  monthlyRevenue: MonthRevenue[];
  orderStatusSlices: StatusSlice[];
  topProducts: TopProduct[];
  recentOrders: Order[];
}

const emptySalesData: SalesData = {
  totalRevenue: 0,
  totalOrders: 0,
  avgOrderValue: 0,
  revenueGrowth: 0,
  monthlyRevenue: [],
  orderStatusSlices: [],
  topProducts: [],
  recentOrders: [],
};

function revenueForMonthsAgo(orders: Order[], monthsAgo: number): number {
  const now = new Date();
  const target = new Date(now.getFullYear(), now.getMonth() - monthsAgo, 1);

  return orders
    .filter((o) => o.status === "delivered")
    .filter((o) => {
      const d = new Date(o.createdAt);
      return (
        d.getFullYear() === target.getFullYear() &&
        d.getMonth() === target.getMonth()
      );
    })
    .reduce((sum, o) => sum + (o.total ?? 0), 0);
}

export async function getSalesData(userId: string): Promise<SalesData> {
  try {
    const orders = await countDoc<Order>(userId, "Orders");
    const delivered = orders.filter((o) => o.status === "delivered");

    const totalRevenue = delivered.reduce((sum, o) => sum + (o.total ?? 0), 0);
    const totalOrders = orders.length;
    const avgOrderValue = delivered.length ? totalRevenue / delivered.length : 0;

    const currentMonthRevenue = revenueForMonthsAgo(orders, 0);
    const lastMonthRevenue = revenueForMonthsAgo(orders, 1);
    const revenueGrowth = lastMonthRevenue
      ? ((currentMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100
      : currentMonthRevenue > 0
      ? 100
      : 0;

    const productMap = new Map<string, TopProduct>();
    for (const order of delivered) {
      for (const item of order.items ?? []) {
        const existing = productMap.get(item.productId);
        if (existing) {
          existing.quantitySold += item.quantity;
          existing.revenue += item.price * item.quantity;
        } else {
          productMap.set(item.productId, {
            productId: item.productId,
            name: item.name,
            quantitySold: item.quantity,
            revenue: item.price * item.quantity,
          });
        }
      }
    }

    const topProducts = Array.from(productMap.values())
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    const recentOrders = [...orders]
      .sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 8);

    return {
      totalRevenue,
      totalOrders,
      avgOrderValue,
      revenueGrowth,
      monthlyRevenue: toMonthlyRevenue(orders, 6),
      orderStatusSlices: toStatusSlices(orders),
      topProducts,
      recentOrders,
    };
  } catch (error) {
    console.error("Error fetching sales data:", error);
    return emptySalesData;
  }
}