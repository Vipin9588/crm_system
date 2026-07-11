import type { Order } from "../../Order/api/orderStatus";

type Props = {
  orders: Order[];
};

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-warning/10 text-warning ring-warning/20",
  processing: "bg-primary/10 text-primary ring-primary/20",
  shipped: "bg-accent text-accent-foreground ring-border",
  delivered: "bg-success/10 text-success ring-success/20",
  cancelled: "bg-danger/10 text-danger ring-danger/20",
};

export default function RecentOrdersTable({ orders }: Props) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-card-foreground">
            Recent Orders
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Last {orders.length} orders
          </p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="flex h-52 items-center justify-center">
          <p className="text-sm text-muted-foreground">
            No orders yet. New orders will appear here.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Order
                </th>

                <th className="py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Customer ID
                </th>

                <th className="py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Amount
                </th>

                <th className="py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Status
                </th>

                <th className="py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.orderId}
                  className="
                    border-b
                    border-border
                    last:border-0
                    transition-colors
                    hover:bg-accent/40
                  "
                >
                  <td className="py-4 font-medium text-card-foreground">
                    {order.orderId}
                  </td>

                  <td className="py-4 text-muted-foreground">
                    {order.customerId || "—"}
                  </td>

                  <td className="py-4 font-medium text-card-foreground">
                    ₹{(order.total || 0).toLocaleString("en-IN")}
                  </td>

                  <td className="py-4">
                    <span
                      className={`
                        inline-flex
                        items-center
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-medium
                        capitalize
                        ring-1
                        ring-inset
                        ${
                          STATUS_STYLES[order.status] ??
                          "bg-muted text-muted-foreground ring-border"
                        }
                      `}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="py-4 text-muted-foreground">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                        })
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}