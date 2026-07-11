"use client";

import { useEffect, useState } from "react";
import { getSalesData, type SalesData } from "../api/getSalesData";

const emptySalesData: SalesData = {
  totalRevenue: 0,
  totalOrders: 0,
  avgOrderValue: 0,
  revenueGrowth: 0,
  monthlyRevenue: [],
  orderStatusSlices: [],
  topProducts: [],
  recentOrders: [],
};

export function useSalesData(userId: string | undefined) {
  const [data, setData] = useState<SalesData>(emptySalesData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);

    getSalesData(userId).then((result) => {
      if (isMounted) {
        setData(result);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [userId]);

  return { data, loading };
}