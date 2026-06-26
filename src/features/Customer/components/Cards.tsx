"use client";

import { useMemo, type ComponentType } from "react";
import { Badge } from "@/Components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Users, UserCheck, UserX } from "lucide-react";
import type { Customer } from "../types";

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
  customers: Customer[];
  loading?: boolean;
}

function isSameMonth(dateStr: string, ref: Date): boolean {
  const d = new Date(dateStr);
  return d.getFullYear() === ref.getFullYear() && d.getMonth() === ref.getMonth();
}

function buildCards(customers: Customer[]): CardDef[] {
  const total = customers.length;

  // No "status" field is currently saved on Customer records, so "active" here
  // means "has placed at least one order" — the only real signal we have.
  // Swap this for customer.status === "active" once that field is persisted.
  const withOrders = customers.filter((c) => (c.totalOrders ?? 0) > 0).length;
  const withoutOrders = total - withOrders;

  const now = new Date();
  const newThisMonth = customers.filter((c) => isSameMonth(c.createdAt, now)).length;

  return [
    {
      title: "Total customers",
      value: total.toLocaleString("en-IN"),
      description: "Total number of customers",
      badge: "Customers",
      icon: Users,
      badgeClass: "bg-info/10 text-info",
      iconClass: "text-info",
    },
    {
      title: "With orders",
      value: withOrders.toLocaleString("en-IN"),
      description: "Customers who have placed an order",
      badge: "Active",
      icon: UserCheck,
      badgeClass: "bg-success/10 text-success",
      iconClass: "text-success",
    },
    {
      title: "No orders yet",
      value: withoutOrders.toLocaleString("en-IN"),
      description: "Customers with zero orders",
      badge: "Alert",
      icon: UserX,
      badgeClass: "bg-destructive/10 text-destructive",
      iconClass: "text-destructive",
    },
    {
      title: "New this month",
      value: newThisMonth.toLocaleString("en-IN"),
      description: "Customers added this month",
      badge: "Growth",
      icon: Users,
      badgeClass: "bg-warning/10 text-warning",
      iconClass: "text-warning",
    },
  ];
}

function skeletonCards(): CardDef[] {
  return [
    {
      title: "Total customers",
      value: "—",
      description: "Total number of customers",
      badge: "Customers",
      icon: Users,
      badgeClass: "bg-info/10 text-info",
      iconClass: "text-info",
    },
    {
      title: "With orders",
      value: "—",
      description: "Customers who have placed an order",
      badge: "Active",
      icon: UserCheck,
      badgeClass: "bg-success/10 text-success",
      iconClass: "text-success",
    },
    {
      title: "No orders yet",
      value: "—",
      description: "Customers with zero orders",
      badge: "Alert",
      icon: UserX,
      badgeClass: "bg-destructive/10 text-destructive",
      iconClass: "text-destructive",
    },
    {
      title: "New this month",
      value: "—",
      description: "Customers added this month",
      badge: "Growth",
      icon: Users,
      badgeClass: "bg-warning/10 text-warning",
      iconClass: "text-warning",
    },
  ];
}

export default function Cards({ customers, loading = false }: CardsProps) {
  const cards = useMemo(() => {
    if (loading) return skeletonCards();
    return buildCards(customers);
  }, [customers, loading]);

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
              <div
                className={`w-8 h-8 rounded-md flex items-center justify-center mb-1 ${card.badgeClass}`}
              >
                <Icon className={`size-4 ${card.iconClass}`} />
              </div>
              <CardDescription className="text-xs text-muted-foreground">
                {card.title}
              </CardDescription>
              <CardTitle className="text-2xl font-semibold">{card.value}</CardTitle>
              <CardAction>
                <Badge variant="secondary" className={`text-xs gap-1 ${card.badgeClass}`}>
                  <Icon className="size-3" />
                  {card.badge}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="pt-0">
              <p className="text-muted-foreground text-xs">{card.description}</p>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}