import type { OrderObject } from "./OrderListCard";

type OrderProps = {
  showSummary: OrderObject | null;
};

export default function OrderSummaryCard({
  showSummary,
}: OrderProps) {
  if (!showSummary) return null;

  return (
    <div className="h-full bg-white p-6">
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold">
          {showSummary.orderId}
        </h2>

        <div className="mt-2 flex gap-2">
          <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
            {showSummary.status}
          </span>

          <span className="text-sm text-gray-500">
            {showSummary.date}
          </span>
        </div>
      </div>

      <div className="mt-6 rounded-xl border p-4">
        <h3 className="mb-3 text-sm font-semibold uppercase text-gray-500">
          Customer
        </h3>

        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 font-semibold">
            {showSummary.customer.charAt(0)}
          </div>

          <div>
            <h4 className="font-medium">
              {showSummary.customer}
            </h4>

            <p className="text-sm text-gray-500">
              Customer Contact
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="mb-3 text-sm font-semibold uppercase text-gray-500">
          Order Items
        </h3>

        <div className="rounded-xl border p-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-lg bg-gray-100" />

            <div className="flex-1">
              <h4 className="font-medium">
                Sample Product
              </h4>

              <p className="text-sm text-gray-500">
                Qty: 1
              </p>
            </div>

            <span className="font-semibold">
              ₹{showSummary.total}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl border p-4">
        <h3 className="mb-4 text-sm font-semibold uppercase text-gray-500">
          Payment Summary
        </h3>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-500">
              Subtotal
            </span>
            <span>₹{showSummary.total}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">
              Shipping
            </span>
            <span>₹0</span>
          </div>

          <div className="border-t pt-3">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>₹{showSummary.total}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button className="flex-1 rounded-lg border px-4 py-2">
          Print
        </button>

        <button className="flex-1 rounded-lg bg-black px-4 py-2 text-white">
          Update Status
        </button>
      </div>
    </div>
  );
}