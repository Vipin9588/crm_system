"use client";

import { useMemo, type ComponentType } from "react";
import { Badge } from "../../../Components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../Components/ui/card";
import { Package, Boxes, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";

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

interface CardDef {
  title: string;
  value: string;
  description: string;
  badge: string;
  icon: ComponentType<{ className?: string }>;
  badgeClass: string;
  iconClass: string;
}

interface CardsProps {
  status: OrderStatus;
  loading?: boolean;
}

function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

function isSameMonth(dateStr: string, ref: Date): boolean {
  const d = new Date(dateStr);
  return d.getFullYear() === ref.getFullYear() && d.getMonth() === ref.getMonth();
}

function sumTotals(orders: Order[]): number {
  return orders.reduce((sum, o) => sum + (o.total ?? 0), 0);
}

function buildCards(status: OrderStatus): CardDef[] {
  const orders = status.orders ?? [];

  const paidOrders = orders.filter((o) => o.status === "delivered");
  const pendingOrders = orders.filter(
    (o) => o.status === "pending" || o.status === "processing" || o.status === "shipped"
  );
  const cancelledOrders = orders.filter((o) => o.status === "cancelled");

  const paymentDone = sumTotals(paidOrders);
  const pendingAmount = sumTotals(pendingOrders);
  const cancelledAmount = sumTotals(cancelledOrders);

  const now = new Date();
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const thisMonthRevenue = sumTotals(paidOrders.filter((o) => isSameMonth(o.createdAt, now)));
  const lastMonthRevenue = sumTotals(
    paidOrders.filter((o) => isSameMonth(o.createdAt, lastMonth))
  );

  let growthLabel: string;
  let growthPositive = true;
  if (lastMonthRevenue === 0) {
    growthLabel = thisMonthRevenue === 0 ? "0%" : "+100%";
  } else {
    const pct = ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100;
    growthPositive = pct >= 0;
    growthLabel = `${pct >= 0 ? "+" : ""}${pct.toFixed(1)}%`;
  }

  return [
    {
      title: "Payment Done",
      value: formatCurrency(paymentDone),
      description: "Amount paid by customers",
      badge: "Orders",
      icon: Package,
      badgeClass: "bg-info/10 text-info",
      iconClass: "text-info",
    },
    {
      title: "Pending Payments",
      value: formatCurrency(pendingAmount),
      description: "Amount not paid yet",
      badge: "Pending",
      icon: Boxes,
      badgeClass: "bg-warning/10 text-warning",
      iconClass: "text-warning",
    },
    {
      title: "Cancelled Amount",
      value: formatCurrency(cancelledAmount),
      description: "Orders cancelled total amount",
      badge: "Alert",
      icon: AlertTriangle,
      badgeClass: "bg-destructive/10 text-destructive",
      iconClass: "text-destructive",
    },
    {
      title: "Revenue Growth",
      value: growthLabel,
      description: "Compared to last month",
      badge: "Growth",
      icon: growthPositive ? TrendingUp : TrendingDown,
      badgeClass: growthPositive
        ? "bg-success/10 text-success"
        : "bg-destructive/10 text-destructive",
      iconClass: growthPositive ? "text-success" : "text-destructive",
    },
  ];
}

function skeletonCards(): CardDef[] {
  return [
    {
      title: "Payment Done",
      value: "—",
      description: "Amount paid by customers",
      badge: "Orders",
      icon: Package,
      badgeClass: "bg-info/10 text-info",
      iconClass: "text-info",
    },
    {
      title: "Pending Payments",
      value: "—",
      description: "Amount not paid yet",
      badge: "Pending",
      icon: Boxes,
      badgeClass: "bg-warning/10 text-warning",
      iconClass: "text-warning",
    },
    {
      title: "Cancelled Amount",
      value: "—",
      description: "Orders cancelled total amount",
      badge: "Alert",
      icon: AlertTriangle,
      badgeClass: "bg-destructive/10 text-destructive",
      iconClass: "text-destructive",
    },
    {
      title: "Revenue Growth",
      value: "—",
      description: "Compared to last month",
      badge: "Growth",
      icon: TrendingUp,
      badgeClass: "bg-success/10 text-success",
      iconClass: "text-success",
    },
  ];
}

export default function Cards({ status, loading = false }: CardsProps) {
  const cards = useMemo(() => {
    if (loading) return skeletonCards();
    return buildCards(status);
  }, [status, loading]);

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card
            key={card.title}
            className="bg-card border border-border rounded-xl shadow-none hover:shadow-sm transition-shadow"
          >
            <CardHeader className="pb-2">
              <div className={`w-8 h-8 rounded-md flex items-center justify-center mb-1 ${card.badgeClass}`}>
                <Icon className={`size-4 ${card.iconClass}`} />
              </div>
              <CardDescription className="text-xs text-muted-foreground">
                {card.title}
              </CardDescription>
              <CardTitle className="text-2xl font-semibold">
                {card.value}
              </CardTitle>
              <CardAction>
                <Badge
                  variant="secondary"
                  className={`text-xs gap-1 ${card.badgeClass}`}
                >
                  <Icon className="size-3" />
                  {card.badge}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="pt-0">
              <p className="text-muted-foreground text-xs">
                {card.description}
              </p>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
