import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../../Components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "../../../Components/ui/card";
import { formatCurrency } from "../utils/format";
import type { Order } from "../../Order/api/orderStatus";

const STATUS_STYLES: Record<Order["status"], string> = {
  pending: "bg-warning/15 text-warning",
  processing: "bg-accent text-accent-foreground",
  shipped: "bg-primary/15 text-primary",
  delivered: "bg-success/15 text-success",
  cancelled: "bg-danger/15 text-danger",
};

export function RecentOrdersTable({ orders }: { orders: Order[] }) {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-base font-medium">Recent orders</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-6">Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="pr-6 text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="py-8 text-center text-muted-foreground">
                  No orders yet
                </TableCell>
              </TableRow>
            )}
            {orders.map((order) => (
              <TableRow key={order.orderId}>
                <TableCell className="pl-6 font-medium text-foreground">
                  #{order.orderId.slice(0, 8)}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${STATUS_STYLES[order.status]}`}
                  >
                    {order.status}
                  </span>
                </TableCell>
                <TableCell className="pr-6 text-right font-medium text-foreground">
                  {formatCurrency(order.total ?? 0)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}