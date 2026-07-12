import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card";
import { formatCurrency } from "../utils/format";
import type { TopProduct } from "../api/getSalesData";

export function TopProductsCard({ products }: { products: TopProduct[] }) {
  const max = Math.max(...products.map((p) => p.revenue), 1);

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-base font-medium">Top products</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {products.length === 0 && (
          <p className="text-sm text-muted-foreground">No sales yet.</p>
        )}
        {products.map((product, i) => (
          <div key={product.productId} className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 font-medium text-foreground">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[11px] text-accent-foreground">
                  {i + 1}
                </span>
                {product.name}
              </span>
              <span className="text-muted-foreground">
                {formatCurrency(product.revenue)}
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${(product.revenue / max) * 100}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {product.quantitySold} sold
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}