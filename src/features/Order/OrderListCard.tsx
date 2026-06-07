import { useState } from "react";

export type OrderObject = {
  orderId: string;
  customer: string;
  status: string;
  total: number;
  date: string;
};

type orderProps = {
  orderList: OrderObject[];
  setOrderSummary: React.Dispatch<React.SetStateAction<OrderObject | null>>;
  setOpenSummary: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function OrderListCard({
  orderList,
  setOrderSummary,
  setOpenSummary,
}: orderProps) {
  return (
    <div className="overflow-scroll">
      {orderList.map((order, index) => (
        <div
          key={index + order.orderId}
          className="
            border-b
            grid
            grid-cols-[120px_minmax(180px,1fr)_120px_100px_120px_40px]
            gap-4
            p-3
            cursor-pointer
            hover:bg-gray-50
            text-sm-font
            sm:text-md-font
          "
        >
          <div>{order.orderId}</div>
          <div ><span 
          className="hover:underline hover:text-blue-600"
          onClick={() => {
            setOrderSummary(order);
            setOpenSummary(true);
          }}>{order.customer}</span></div>
          <div>{order.status}</div>
          <div>₹{order.total}</div>
          <div>{order.date}</div>
          <div>...</div>
        </div>
      ))}
    </div>
  );
}