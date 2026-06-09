export type OrderObject = {
  orderId: string;
  customer: string;
  status: string;
  total: number;
  date: string;
};

type Props = {
  orderList: OrderObject[];
  setOrderSummary: React.Dispatch<
    React.SetStateAction<OrderObject | null>
  >;
  setOpenSummary: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

const getStatusClass = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-700";

    case "Pending":
      return "bg-yellow-100 text-yellow-700";

    case "Cancelled":
      return "bg-red-100 text-red-700";

    case "Shipped":
      return "bg-blue-100 text-blue-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function OrderListCard({
  orderList,
  setOrderSummary,
  setOpenSummary,
}: Props) {
  return (
    <>
      {orderList.map((order) => (
        <div
          key={order.orderId}
          className="
            grid
            grid-cols-[120px_minmax(180px,1fr)_120px_120px_120px]
            gap-4
            border-b
            p-3
            hover:bg-muted/50
          "
        >
          <div>{order.orderId}</div>

          <div>
            <button
              className="text-left hover:text-primary hover:underline"
              onClick={() => {
                setOrderSummary(order);
                setOpenSummary(true);
              }}
            >
              {order.customer}
            </button>
          </div>

          <div>
            <span
              className={`rounded-full px-2 py-1 text-xs ${getStatusClass(order.status)}`}
            >
              {order.status}
            </span>
          </div>

          <div>₹{order.total}</div>

          <div>{order.date}</div>
        </div>
      ))}
    </>
  );
}