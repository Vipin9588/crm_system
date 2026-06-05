import React from 'react'
import type { OrderObject } from './OrderListCard'
type order = {
    showSummary: OrderObject | null
}

export default function OrderSummaryCard({ showSummary }: order) {
    if (showSummary === null) return
    return (
        <div className='border-2'>
            <h2>{showSummary.orderId}</h2>
            <div className='flex gap-2'>
                <span>{showSummary.status}</span>
                <span>{showSummary.date}</span>
            </div>
            <div className='flex flex-rows '>
                <div>
                    customerimg
                    <img src="" alt="" />
                </div>
                <h1>{showSummary.customer}</h1>
                <div>Contact</div>
            </div>

            <div className='orderItems'>
                <h1>orderitems</h1>
                <div>
                    <div className='flex gap-4'>
                        <img src="" alt="" />
                        <div>
                            <h4>item</h4>
                            <h4>{showSummary.total}</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-between '>
                <span>total</span>
                <span>{showSummary.total}</span>
            </div>


        </div >
    )
}

