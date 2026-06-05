
export type OrderObject = {
    orderId: string
    customer: string
    status: string
    total: number
    date: string
}

type orderProps = {
    orderList: OrderObject[],
    setOrderSummary: React.Dispatch<React.SetStateAction<OrderObject | null>>
}

export default function OrderListCard({ orderList, setOrderSummary }: orderProps) {
    return (
        <div className="border border-red-400 m-4">
            {
                orderList.map((order, index) => {
                    return <div key={index + order.orderId} className='border grid grid-cols-6 text-md-font p-2'
                        onClick={() => { setOrderSummary(order) }}
                    >
                        <div>{order.orderId}</div>
                        <div>{order.customer}</div>
                        <div>{order.status}</div>
                        <div>{order.total}</div>
                        <div>{order.date}</div>
                        <div>...</div>
                    </div>
                })
            }
        </div>
    )
}
