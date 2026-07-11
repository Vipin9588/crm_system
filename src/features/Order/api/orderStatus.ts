import countDoc from "../../../services/countDoc";

export interface OrderItem {
  name: string;
  price: number;
  productId: string;
  quantity: number;
}

export interface Order {
  createdAt: string;
  customerId: string;
  deliveryDate: string;
  items: OrderItem[];
  orderId: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  userId: string;
}

export interface OrderStatus {
  pending: number;
  processing: number;
  shipped: number;
  delivered: number;
  cancelled: number;
  totalOrders: number;
  orders: Order[];
}

const orderStatus = async (userId: string): Promise<OrderStatus> => {
  const status: OrderStatus = {
    pending: 0,
    processing: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
    totalOrders: 0,
    orders: [],
  };

  try {
    const orders = (await countDoc(userId, "Orders")) as Order[];

    status.orders = orders;
    status.totalOrders = orders.length;

    orders.forEach((order) => {
      switch (order.status) {
        case "pending":
          status.pending++;
          break;

        case "processing":
          status.processing++;
          break;

        case "shipped":
          status.shipped++;
          break;

        case "delivered":
          status.delivered++;
          break;

        case "cancelled":
          status.cancelled++;
          break;
      }
    });

    return status;
  } catch (error) {
    console.error(error);
    return status;
  }
};

export default orderStatus;
