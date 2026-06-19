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
import { Users, Boxes, AlertTriangle, TrendingUp } from "lucide-react";

const cards = [
    {
        title: "total customers",
        value: "5,490",
        description: "toatal number of  customers",
        badge: "customer",
        icon: Users,
        badgeClass: "bg-info/10 text-info",
        iconClass: "text-info",
    },
    {
        title: "Active customers",
        value: "2,100",
        description: "toatal number of Active customers",
        badge: "Active",
        icon: Users,
        badgeClass: "bg-success/10 text-success",
        iconClass: "text-success",
    },
    {
        title: "Not Active",
        value: "1,350",
        description: "total number of not active customers",
        badge: "Alert",
        icon: AlertTriangle,
        badgeClass: "bg-destructive/10 text-destructive",
        iconClass: "text-destructive",
    },

];

export default function Cards() {
    return (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
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