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

import {
  Package,
  Boxes,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";

const cards = [
  {
    title: "Payment Done",
    value: "₹5,490",
    description: "Amount paid by customers",
    badge: "Orders",
    icon: Package,
    badgeClass: "",
  },
  {
    title: "Pending Payments",
    value: "₹2,100",
    description: "Amount not paid yet",
    badge: "Pending",
    icon: Boxes,
    badgeClass: "",
  },
  {
    title: "Cancelled Amount",
    value: "₹1,350",
    description: "Orders cancelled total amount",
    badge: "Alert",
    icon: AlertTriangle,
    badgeClass: "bg-warning text-black",
  },
  {
    title: "Revenue Growth",
    value: "+8.2%",
    description: "Compared to last month",
    badge: "Growth",
    icon: TrendingUp,
    badgeClass: "bg-success text-white",
  },
];

export default function Cards() {
  return (
    <div className="grid gap-6 grid-cols-1 grid-rows-1 md:grid-cols-4  p-4 ">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card
            key={card.title}
            className="bg-card border-border rounded-2xl shadow-sm hover:shadow-md transition-all"
          >
            <CardHeader>
              <CardDescription>{card.title}</CardDescription>

              <CardTitle className="text-3xl font-bold">
                {card.value}
              </CardTitle>

              <CardAction>
                <Badge
                  variant="secondary"
                  className={`gap-1 ${card.badgeClass}`}
                >
                  <Icon className="size-4" />
                  {card.badge}
                </Badge>
              </CardAction>
            </CardHeader>

            <CardFooter>
              <p className="text-muted-foreground text-sm">
                {card.description}
              </p>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}