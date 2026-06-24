"use client";

import { Badge } from "@/Components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import type { Status } from "../api/getStatus";
import {
  Package,
  Boxes,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";

export function ProductCards({status}:{status:Status}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4 p-4">
      {/* Total Products */}
      <Card className="bg-card border-border rounded-2xl shadow-sm hover:shadow-md transition-all">
        <CardHeader>
          <CardDescription className="text-muted-foreground">
            Total Products
          </CardDescription>

          <CardTitle className="text-foreground text-3xl font-bold">
            {status.totalProducts}
          </CardTitle>

          <CardAction>
            <Badge variant="secondary" className="gap-1">
              <Package className="size-4" />
              Products
            </Badge>
          </CardAction>
        </CardHeader>

        <CardFooter>
          <p className="text-muted-foreground text-sm">
            Products available in catalog
          </p>
        </CardFooter>
      </Card>

      {/* Categories */}
      <Card className="bg-card border-border rounded-2xl shadow-sm hover:shadow-md transition-all">
        <CardHeader>
          <CardDescription className="text-muted-foreground">
            Categories
          </CardDescription>

          <CardTitle className="text-foreground text-3xl font-bold">
            {status.categories.length}
          </CardTitle>

          <CardAction>
            <Badge variant="secondary" className="gap-1">
              <Boxes className="size-4" />
              Active
            </Badge>
          </CardAction>
        </CardHeader>

        <CardFooter>
          <p className="text-muted-foreground text-sm">
            Product categories managed
          </p>
        </CardFooter>
      </Card>

      {/* Low Stock */}
      <Card className="bg-card border-border rounded-2xl shadow-sm hover:shadow-md transition-all">
        <CardHeader>
          <CardDescription className="text-muted-foreground">
            Low Stock
          </CardDescription>

          <CardTitle className="text-foreground text-3xl font-bold">
           {status.lowStock}
          </CardTitle>

          <CardAction>
            <Badge className="bg-warning text-black gap-1">
              <AlertTriangle className="size-4" />
              Alert
            </Badge>
          </CardAction>
        </CardHeader>

        <CardFooter>
          <p className="text-muted-foreground text-sm">
            Products need restocking
          </p>
        </CardFooter>
      </Card>

      <Card className="bg-card border-border rounded-2xl shadow-sm hover:shadow-md transition-all">
        <CardHeader>
          <CardDescription className="text-muted-foreground">
            Inventory Value
          </CardDescription>

          <CardTitle className="text-foreground text-3xl font-bold">
           {status.inventoryValue}
          </CardTitle>

          <CardAction>
            <Badge className="bg-success text-white gap-1">
              <TrendingUp className="size-4" />
              +8.2%
            </Badge>
          </CardAction>
        </CardHeader>

        <CardFooter>
          <p className="text-muted-foreground text-sm">
            Total inventory worth
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}