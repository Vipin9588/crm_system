import type { OrderObject } from "./OrderListCard";

type OrderProps = {
  showSummary: OrderObject | null;
};

export default function OrderSummaryCard({
  showSummary,
}: OrderProps) {
  if (!showSummary) return null;

  return (
    <div className="h-full bg-card overflow-y-auto">
  {/* Header */}
  <div className="sticky top-0 z-10 border-b bg-card p-6">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-muted-foreground">
          Order ID
        </p>

        <h2 className="mt-1 text-2xl font-bold">
          {showSummary.orderId}
        </h2>
      </div>

      <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
        {showSummary.status}
      </span>
    </div>

    <p className="mt-2 text-sm text-muted-foreground">
      {showSummary.date}
    </p>
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
          <h4 className="font-semibold">
            {showSummary.customer}
          </h4>

          <p className="text-sm text-muted-foreground">
            Premium Customer
          </p>
        </div>
      </div>
    </div>

    {/* Order Item */}
    <div className="rounded-2xl border bg-card p-5 shadow-sm">
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Ordered Item
      </h3>

      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-muted">
          img
        </div>

        <div className="flex-1">
          <h4 className="font-medium">
             Product list hre
          </h4>

          <p className="text-sm text-muted-foreground">
            Quantity: 1
          </p>
        </div>

        <div className="text-right">
          <p className="font-semibold">
            ₹{showSummary.total}
          </p>
        </div>
      </div>
    </div>

    {/* Payment Summary */}
    <div className="rounded-2xl border bg-card p-5 shadow-sm">
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Payment Summary
      </h3>

      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            Subtotal
          </span>

          <span>₹{showSummary.total}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            Shipping
          </span>

          <span>₹0</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            Tax
          </span>

          <span>₹0</span>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>

            <span className="text-primary">
              ₹{showSummary.total}
            </span>
          </div>
        </div>
      </div>
    </div>

    {/* Timeline */}
    <div className="rounded-2xl border bg-card p-5 shadow-sm">
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Order Activity
      </h3>

      <div className="space-y-4">
        <div className="flex gap-3">
          <div className="mt-1 h-2 w-2 rounded-full bg-green-500" />

          <div>
            <p className="text-sm font-medium">
              Order Created
            </p>

            <p className="text-xs text-muted-foreground">
              {showSummary.date}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="mt-1 h-2 w-2 rounded-full bg-blue-500" />

          <div>
            <p className="text-sm font-medium">
              Payment Received
            </p>

            <p className="text-xs text-muted-foreground">
              Awaiting Update
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Actions */}
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