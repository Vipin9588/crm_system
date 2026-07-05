import type { productDatatype } from "@/features/product/productStructer";
import { checkStatus } from "@/features/product/api/getProducts";

type Props = {
  products: productDatatype[];
};

const STATUS_STYLES: Record<string, string> = {
  "Out of Stock": "bg-danger/10 text-danger ring-danger/20",
  "Low Stock": "bg-warning/10 text-warning ring-warning/20",
  "In Stock": "bg-success/10 text-success ring-success/20",
};

export default function LowStockTable({ products }: Props) {
  const sorted = [...products].sort(
    (a, b) => Number(a.stock) - Number(b.stock)
  );

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-card-foreground">
            Inventory Alerts
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Products requiring immediate attention.
          </p>
        </div>

        <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
          {products.length} item{products.length === 1 ? "" : "s"}
        </span>
      </div>

      {sorted.length === 0 ? (
        <div className="flex h-52 items-center justify-center">
          <p className="text-sm text-muted-foreground">
            Stock levels look healthy. Nothing needs attention.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Product
                </th>

                <th className="py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Category
                </th>

                <th className="py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Stock
                </th>

                <th className="py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {sorted.slice(0, 8).map((product) => {
                const status = checkStatus(Number(product.stock) || 0);

                return (
                  <tr
                    key={product.id}
                    className="
                      border-b
                      border-border
                      last:border-0
                      transition-colors
                      hover:bg-accent/40
                    "
                  >
                    <td className="py-4 font-medium text-card-foreground">
                      {product.name}
                    </td>

                    <td className="py-4 text-muted-foreground">
                      {product.category || "—"}
                    </td>

                    <td className="py-4 font-medium text-card-foreground">
                      {product.stock}
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
                          ring-1
                          ring-inset
                          ${
                            STATUS_STYLES[status] ??
                            "bg-muted text-muted-foreground ring-border"
                          }
                        `}
                      >
                        {status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}