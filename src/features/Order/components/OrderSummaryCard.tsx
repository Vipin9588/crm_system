import type { OrderObject } from "./OrderListCard";
import type { OrderItem } from "@/features/Order/api/orderStatus";

type OrderProps = {
  showSummary: OrderObject | null;
  items?: OrderItem[];
};

function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function OrderSummaryCard({ showSummary, items = [] }: OrderProps) {
  if (!showSummary) {
    return (
      <div className="flex h-full items-center justify-center bg-card p-6 text-center">
        <p className="text-sm text-muted-foreground">Select an order to see its details.</p>
      </div>
    );
  }

  const subtotal = items.length
    ? items.reduce((sum, i) => sum + i.price * i.quantity, 0)
    : showSummary.total;

  return (
    <div className="h-full bg-card overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b bg-card p-6 w-full">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Order ID</p>
            <h2 className="mt-1 text-2xl font-bold">{showSummary.orderId}</h2>
          </div>

          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium capitalize text-primary">
            {showSummary.status}
          </span>
        </div>

        <p className="mt-2 text-sm text-muted-foreground">{showSummary.date}</p>
      </div>

      <div className="space-y-5 p-6">
        {/* Customer Card */}
        <div className="rounded-2xl border bg-card p-5 shadow-sm">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Customer Information
          </h3>

          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
              {showSummary.customer.charAt(0)}
            </div>

            <div>
              <h4 className="font-semibold">{showSummary.customer}</h4>
              <p className="text-sm text-muted-foreground">Premium Customer</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-5 shadow-sm">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Ordered Items
          </h3>

          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground">No item details available.</p>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.productId} className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-muted text-xs text-muted-foreground">
                    img
                  </div>

                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border bg-card p-5 shadow-sm">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Payment Summary
          </h3>

          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span>{formatCurrency(0)}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax</span>
              <span>{formatCurrency(0)}</span>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">{formatCurrency(showSummary.total)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-5 shadow-sm">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Order Activity
          </h3>

          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="mt-1 h-2 w-2 rounded-full bg-green-500" />
              <div>
                <p className="text-sm font-medium">Order Created</p>
                <p className="text-xs text-muted-foreground">{showSummary.date}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
              <div>
                <p className="text-sm font-medium">Payment Received</p>
                <p className="text-xs text-muted-foreground">Awaiting Update</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button className="flex-1 rounded-xl border px-4 py-3 font-medium transition hover:bg-muted">
            Print Invoice
          </button>

          <button className="flex-1 rounded-xl bg-primary px-4 py-3 font-medium text-primary-foreground transition hover:opacity-90">
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
}
